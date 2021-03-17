import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import AuthenticationService from './AuthenticationService'

class TodoApp extends Component {
  render() {
    return (
      <div className="TodoApp">
        <Router>
          <div>
            <HeaderComponent />
            <Switch>
              <Route path="/" exact component={LoginComponent} />
              <Route path="/login" component={LoginComponent} />
              <Route path="/welcome/:name" component={WelcomeComponent} />
              <Route path="/todos" component={ListTodosComponent} />
              <Route path="/logout" component={LogoutComponent} />
              <Route component={ErrorComponent} />
            </Switch>
            <FooterComponent />
          </div>
        </Router>
      </div>
    );
  }
}

class WelcomeComponent extends Component {
  render() {
    return (
      <div>
        <h1>Welcome</h1>
        <div className="container">
          Welcome {this.props.match.params.name} you can manage your todos <Link to="/todos">here</Link>
          </div>
      </div>
    )
  }
}

class HeaderComponent extends Component {
  
  render() {
    const isUserLoggedIn = AuthenticationService.isUserLogged();
    console.log('login?' + isUserLoggedIn);
    return (
     
      <header>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div><a href>mynspluto</a></div>
          <ul className="navbar-nav">
            {isUserLoggedIn && <li><Link className="nav-link" to="/welcome/mynspluto">Home</Link></li>}
            {isUserLoggedIn && <li><Link className="nav-link" to="/todos">Todos</Link></li>}
          </ul>
          <ul className="navbar-nav navbar-collapse justify-content-end">
            {!isUserLoggedIn &&<li><Link className="nav-link" to="/login">Login</Link></li>}
            {isUserLoggedIn &&<li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
          </ul>
        </nav>
      </header>

    )
  }
}

class FooterComponent extends Component {
  render() {
    return (
      <footer className="footer">
        <span className="text-muted">All Rights Reserved mynspluto</span>
      </footer>
    )
  }
}

class LogoutComponent extends Component {
  render(){
    return (
      <div>
        <h1>You are logged out</h1>
        <div className="container">
          Thank you for Using Out Application
        </div>
      </div>
    )
  }
}

class ListTodosComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos:
        [
          { id: 1, description: 'Learn React', done: false, targetDate: new Date() },
          { id: 2, description: 'Learn React2', done: false, targetDate: new Date() },
          { id: 3, description: 'Learn React3', done: false, targetDate: new Date() },
        ]
    }
  }

  render() {
    return (
      <div>
        <h1>List Todos</h1>
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th>id</th>
                <th>description</th>
                <th>Target Date</th>
                <th>Is Completed?</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.todos.map(
                  todo =>
                    <tr>
                      <td>{todo.id}</td>
                      <td>{todo.description}</td>
                      <td>{todo.targetDate.toString()}</td>
                      <td>{todo.done.toString()}</td>
                    </tr>

                )

              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

function ErrorComponent() {
  return <div>Error</div>


}

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
    if (this.state.username === 'mynspluto' && this.state.password === '123') {
      //console.log('Successful');
      AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
      this.props.history.push(`/welcome/${this.state.username}`)
      //this.setState({show: true})
      //this.setState({hasLoginFailed: false})
    }
    else {
      //console.log('fail');
      this.setState({ show: false })
      this.setState({ hasLoginFailed: true })
    }
    //console.log(this.state);
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

function ShowInvalidCredentials(props) {
  console.log(props.hasLoginFailed);
  if (props.hasLoginFailed) {
    return <div>Invalid Credentials</div>
  }
  return null
}

function ShowLoginSuccessMessage(props) {
  console.log(props)
  if (props.show) {
    return <div>Login Successful</div>
  }
  return null
}

export default TodoApp