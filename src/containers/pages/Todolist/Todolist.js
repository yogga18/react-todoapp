import React, {Component, Fragment} from 'react';

// Component
import TodoCard from './TodoCard';

//Styling
import './Todolist.scss';
import Button from '@material-ui/core/Button';
import TransitionsModal from '../../../components/atoms/Modal/modal1';

class Todolist extends Component {
    state = {
        Todos : [],
        inputText : "",
        editItem: false
    }

    hendlerChange = (e) => {
        this.setState({
            inputText: e.target.value
        })
    }

    hendlerSubmit = (e) => {
        e.preventDefault();
        this.setState({
            // Spread array ini menggabungkan array yg sudah ada dengan value yg akan di masukann
            Todos : [...this.state.Todos, {title: this.state.inputText,  id: Math.random() + 1}],
            inputText : ''
        })

        alert('Input Success')
    }

    // parameter todo disini berisi id yang di kirimkan dari file TodoCard
    // ketika hendle Deletnya di klik props dari TodoCard mengirimkan unik id
    // agar item yang di klik dihapus sesuai dengan unik id nya dan tidak menyebabkan item yang lain ikut terhapus
    hendlerDelet = (todo) => {
        // membuat variable deletItem nantinya ini akan di masukkan Filtering array
        // Filtering data state Todos yang mana Todos berisi array yang di dalamnya banyak object
        // Object tersebut memiliki text dan unik id (index) yg berbeda"
        // Filtering ini berupa function dan ia meminta sebuah parameter
        // Lalu ia mengirimkan nilai balik yaitu data.id yang ber isi id yg sudah di filter
        // !== (operator logika) apakah data.id sama nilainya dengan id yg dikirimkan dari props delet yg ada di file TodoCard
        // Jika sama maka setState Todos dengan variable deletItem
        const deletItem = this.state.Todos.filter((data) => {
           return data.id !== todo
        });

        // props.setTodos(props.todos.filter( (elemnt) => elemnt.id !== props.data.id ));

        // Data di dalam state Todos di set kembali dengan data dari deletItem
        // Berarti jika sebelumnya data ada 2 dan sudah di filter sekarang menjadi 1 dan kembali di render
        this.setState({
            Todos : deletItem
        });

        alert('Delete Was Successful')
    }

    hendlerEdit = (todo) => {
        const deletItem = this.state.Todos.filter((data) => {
            return data.id !== todo
         });
         const selectedItem = this.state.Todos.find((data) => {
             return data.id === todo
         })

         this.setState({
             Todos : deletItem,
             inputText : selectedItem.title,
             editItem : true,
             todo : todo,
         })
    }

    goBack = () => {
        const {history} = this.props;
        history.push('/Dashboard');
    }

    render() {
        return(
            <Fragment>
                <div className="nav-btn">
                    <Button
                    sezie="medium"
                    variant="contained"
                    color="secondary"
                    onClick={this.goBack}>Back</Button>

                    <TransitionsModal/>
                </div>

                <div className="form-wrapper">
                    <form className="form-input">
                        <input
                        value={this.state.inputText}
                        type="text"
                        name="title"
                        placeholder="Input Title"
                        onChange={this.hendlerChange}
                        />
                        <div className="btn-submit">
                            <Button
                            size="medium"
                            variant="contained"
                            color="primary"
                            disabled={this.state.inputText ? false : true}
                            onClick={this.hendlerSubmit}> Submit </Button>
                        </div>
                    </form>
                </div>
                {
                    this.state.Todos.map((todo) => {
                        return(
                            <TodoCard
                            data={todo}
                            delet={this.hendlerDelet}
                            edit={this.hendlerEdit}/>
                        )
                    })
                }
            </Fragment>
        )
    }
}
export default Todolist;