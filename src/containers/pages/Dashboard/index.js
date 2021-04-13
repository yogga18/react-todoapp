import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { addDataToApi, getDataFromApi, updateDataAPI, deletDataAPI, logoutUserAPI } from '../../../config/redux/action';

// Styling
import './Dashboard.scss';
import Button from '@material-ui/core/Button';
import TransitionsModal from '../../../components/atoms/Modal/modal';

class Dashboard extends Component {
    state = {
        title : '',
        date : '',
        content : '',
        textButton : 'SIMPAN',
        notesId : '',
    }

    componentDidMount(){
        const userData = JSON.parse(localStorage.getItem('userData'));
        this.props.getUsers(userData.uid)
    }

    handleSaveNotes = () => {
        const {title, content, textButton, notesId} = this.state
        const {saveNotes, updateNotes} = this.props
        const userData = JSON.parse(localStorage.getItem('userData'))
        console.log(userData)

        const data = {
            title : title,
            content : content,
            date : new Date().getTime(),
            userId : userData.uid
        }

        // ketika data sudah di submit form di clear kembali
        this.setState({
            title : '',
            content : '',
        })

        if (textButton === 'SIMPAN') {
            saveNotes(data)
        }else {
            data.notesId = notesId
            updateNotes(data)
        }
        console.log(data)
    }

    onInputChange = (e, type)=> {
        this.setState({
            [type] : e.target.value
        })
    }

    updatseNotes = (notes) => {
        console.log(notes)
        this.setState({
            title : notes.data.title,
            content : notes.data.content,
            textButton : 'UPDATE',
            notesId : notes.id
        })
    }

    cancelUpdate = (notes) => {
        this.setState({
            title : '',
            content : '',
            textButton : 'SIMPAN',
        })
    }

    deleteseNotes = (e, notes) => {
        e.stopPropagation();
        const {deleteNotes} = this.props;
        const userData = JSON.parse(localStorage.getItem('userData'));
        const data = {
            userId : userData.uid,
            notesId : notes.id
        }
        deleteNotes(data);
    }

    logoutHandel = () => {
        // const {logout, history} = this.props;
        //     logout();
        //     history.push('/');
        alert('This function is currently under construction, and you can replace the url with / or / register    :)')
    }

    todoList = () => {
        const {history} = this.props;
        history.push('/Todolist')
    }

    modal = () => {
        <TransitionsModal/>
    }

    render() {
        const {title, content, textButton} = this.state;
        const {userNotes} = this.props;
        const {updatseNotes, cancelUpdate, deleteseNotes, handleSaveNotes, logoutHandel, todoList, modal} = this;
        console.log('User Notes', userNotes)
        return(
                <div className='container'>

                    <div className="header">
                        <Button
                        sezie="medium"
                        variant="contained"
                        color="secondary"
                        onClick={logoutHandel}>Logout</Button>
                         <Button
                        sezie="medium"
                        variant="contained"
                        color="primary"
                        onClick={todoList}>Next</Button>
                    </div>

                    <div className="modal">
                        <TransitionsModal/>
                    </div>

                    <div className='input-form'>
                        <input placeholder='title' className='input-title' value={title} onChange={(e) => this.onInputChange(e, 'title')}/>
                        <textarea placeholder='content' className='input-cotent' value={content} onChange={(e) => this.onInputChange(e, 'content')}>

                        </textarea>
                        <div>
                            {
                                textButton === 'UPDATE' ? (
                                    <button className='save-btn' onClick={handleSaveNotes} onClick={cancelUpdate}>Cencel</button>
                                ) : <div/>
                            }
                            <button
                            className='save-btn'
                            onClick={handleSaveNotes}>{textButton}</button>
                        </div>
                    <br/>
                    <hr />
                    {
                        userNotes.length > 0 ? (
                            <Fragment>
                                {
                                    userNotes.map( notes => {
                                        return (
                                            <div className="card-content" key={notes.id}>
                                                <hr />
                                                <h2 className='title'>title : {notes.data.title}</h2>
                                                <p className='date'>id : {notes.data.date}</p>
                                                <h3 className='content'>content : {notes.data.content}</h3>
                                                <hr />

                                                <div className="btn-wrapper">
                                                    <Button
                                                    sezie="medium"
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => updatseNotes(notes)}>Edit</Button>
                                                    <Button
                                                    sezie="medium"
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={(e) => deleteseNotes(e,notes)}>Delet</Button>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Fragment>
                        ) : null
                    }
                    </div>
                </div>
        )
    }
}

const reduxState = (state) => ({
    userData : state.user,
    userNotes : state.userNotes,
})

const reduxDispatch = (dispatch) => ({
    saveNotes : (data) => {dispatch(addDataToApi(data))},
    getUsers : (data) => {dispatch(getDataFromApi(data))},
    updateNotes : (data) => {dispatch(updateDataAPI(data))},
    deleteNotes : (data) => {dispatch(deletDataAPI(data))},
    // logout : (data) => {dispatch(logoutUserAPI(data))}
})

export default connect(reduxState, reduxDispatch)(Dashboard);