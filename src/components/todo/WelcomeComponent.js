import React, {Component} from 'react'
import AuthenticationService from './AuthenticationService'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

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

export default WelcomeComponent