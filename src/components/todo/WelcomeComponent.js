import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import HelloWorldService from '../../api/todo/HelloWorldService.js'

class WelcomeComponent extends Component {
  constructor(props) {
    super(props)
    this.retrieveWelcomeMessage=this.retrieveWelcomeMessage.bind(this)
    this.handleSuccessfulResponse=this.handleSuccessfulResponse.bind(this)
    
    this.state = {
      welcomeMessage: ""
    }

  }

  render() {
    return (
      <div>
        <h1>Welcome</h1>
        <div className="container">
          Welcome {this.props.match.params.name} you can manage your todos <Link to="/todos">here</Link>
          </div>
        <div className="container">
          <button onClick={this.retrieveWelcomeMessage} className="btn btn-success">Get Welcome</button>
        </div>
        <div className="container">
          {this.state.welcomeMessage}
        </div>
      </div>
    )
  }

  retrieveWelcomeMessage() {
    HelloWorldService.executedHelloWorldService()
      .then(response => this.handleSuccessfulResponse(response))
      //.catch()
  }

  handleSuccessfulResponse(response) {
    this.setState({welcomeMessage: response.data})
    
  }
}

export default WelcomeComponent