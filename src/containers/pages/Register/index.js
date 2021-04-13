import React, {Component, Fragment} from 'react';
import './Register.scss';
import Button from '../../../components/atoms/Button';
import { connect } from 'react-redux';
import { registerUserAPI } from '../../../config/redux/action';

class Register extends Component {
    state = {
        email : '',
        password : '',
    }

    handleChangeText = (e) => {
        this.setState({
// karna email dan pass menggunakan function handleChangeText agar statenya tidak terubah dengan value yang sama
// maka di gunakan [e.target.id] ini akan mengisi state sesuai user sedang mengtikan di form yang mana
            [e.target.id] : e.target.value,
            [e.target.id] : e.target.value
        })
    }

    handeleRegisterSubmit = () => {
        const {email, password} = this.state;
        console.log(email,password);
        this.props.registerAPI({email, password});
        this.setState({
            email: '',
            password: '',
        })
    }

    goLogin = () => {
        const {history} = this.props;
        history.push('/');
    }

    render() {
        return(
            <Fragment>
                <div className="card">
                    <div className="card-content">

                        <div class="card-title">
                            <h2>REGISTER</h2>
                        </div>

                        <form>
                            <input className="input" id="email" placeholder="Email" type="email" onChange={this.handleChangeText} value={this.state.email} />
                            <hr/>
                            <input className="input" id="password" placeholder="Password" type="password"onChange={this.handleChangeText} value={this.state.password} />
                            <hr/>
                        </form>
                        <Button onClick={this.handeleRegisterSubmit} title={'Register'} loading={this.props.isLoading}/>
                        
                        <p className="p-text">Do you have an account? <a href="#" onClick={this.goLogin}>Login</a></p>
                        {/* <button className="btn-login" onClick={this.goLogin}>Login</button> */}
                    </div>
                </div>
            </Fragment>
        )
    }
}

const reduxState = (state) => ({
    isLoading : state.isLoading
})

const reduxDispatch = (dispatch) => ({
    registerAPI : (data) => dispatch(registerUserAPI(data))
})

export default connect(reduxState, reduxDispatch)(Register);