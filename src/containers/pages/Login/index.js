import React, {Component, Fragment} from 'react';
import './Login.scss';
import { connect } from 'react-redux';
import { loginUserAPI } from '../../../config/redux/action';
import Button from '../../../components/atoms/Button';


// import { withRouter } from 'react-router-dom';

class Login extends Component {

    state = {
      email : '',
      password : '',
  }

  handleChangeText = (e) => {
      this.setState({
          [e.target.id] : e.target.value,
          [e.target.id] : e.target.value
      })
      // console.log(e.target.id)
  }

  handeleLoginSubmit = async () => {
      const {email, password} = this.state;
      const {history} = this.props;
      const res = await this.props.loginAPI({email, password})
      .catch(err => err);
      if (res === true) {
        // Cek apakah isi dari user benar berisi informasi dari user yg sedang login {Object}
        // console.log('PAGE LOGIN' , this.props.user)

        // Informasi Login User di simpan di local storage 
        // Local Storage hanya bisa menampung string maka dari itu {Object} harus di rubah ke string dulu
        // Nantinya di page Dashboard agar dapat di baca kembali harus di rubah ke bentuk {Object} lagi
        localStorage.setItem('userData', JSON.stringify(this.props.user))
          this.setState({
            email: '',
            password: '',
        })
        history.push('/dashboard')
      }else {
        console.log('Login Fail')
      }
    }

    goSignUp = () => {
      const {history} = this.props;
      history.push('/Register')
    }

    render() {
      return (
        <Fragment>
          <div className="card">
            <div className="card-content">

              <div class="card-title">
                  <h2>LOGIN</h2>
              </div>

              <form>
                <input className="input" id="email" placeholder="Email" type="email" onChange={this.handleChangeText} value={this.state.email} />
                <hr/>
                <input className="input pass" id="password" placeholder="Password" type="password"onChange={this.handleChangeText} value={this.state.password} />
                <hr/>
              </form>
                <Button onClick={this.handeleLoginSubmit} title={'Login'} loading={this.props.isLoading}/>

                <p className="p-text">You don't have an account? <a href="#" onClick={this.goSignUp}>sign up now</a></p>
                {/* <button onClick={this.goSignUp}>Sign up</button> */}
            </div>
          </div>
        </Fragment>
      )
    }
}

const reduxState = (state) => ({
  isLoading : state.isLoading,
  user : state.user,

  yogga : state.yogga,
})

const reduxDispatch = (dispatch) => ({
  loginAPI : (data) => dispatch(loginUserAPI(data)),
})

export default connect(reduxState, reduxDispatch)(Login);