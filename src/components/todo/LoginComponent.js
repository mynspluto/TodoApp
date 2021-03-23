import React, {Component} from 'react'
import AuthenticationService from './AuthenticationService'

class LoginComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: 'mynspluto',
      password: '123',
      hasLoginFailed: false,
      show: false,
    }
    // this.handleUsernameChange = this.handleUsernameChange.bind(this);
    // this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.loginClicked = this.loginClicked.bind(this);
  }

  handleChange(event) {
    console.log(event);
    this.setState(
      {
        [event.target.name]
          : event.target.value
      }
    )
  }

  // handleUsernameChange(event) {
  //     console.log(event);
  //     this.setState({
  //         username: event.target.value
  //     });
  // }

  // handlePasswordChange(event) {
  //     console.log(event);
  //     this.setState({
  //         password: event.target.value
  //     })
  // }

  loginClicked() {
    
    //console.log(this.state);
    let a = AuthenticationService
      .executeBasicAuthenticationService(this.state.username, this.state.password)
      .then(
        () => {
          console.log('suc')
          
          AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
          this.props.history.push(`/welcome/${this.state.username}`)
          
        }
      )
      .catch(
        
        () => {
          console.log('fail')
          this.setState({ show: false })
          this.setState({ hasLoginFailed: true })
        }
      )
    console.log('a'+a)
  }
  render() {
    return (
      <div>
        <h1>Login</h1>
        <div className="container">
          {/* <ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/> */}
          {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
          {this.state.show && <div>LoginSuccess</div>}
          {/* <ShowLoginSuccessMessage show={this.state.show}/> */}
                  User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                  Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
          <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
        </div>
      </div>
    )
  }

}

export default LoginComponent