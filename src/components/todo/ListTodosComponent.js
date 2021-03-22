import React, {Component} from 'react'
import TodoDataService from '../../api/todo/TodoDataService'
import AuthenticationService from './AuthenticationService'
import moment from 'moment'

class ListTodosComponent extends Component {
  constructor(props) {
    console.log('ListTodosComponent Constructor')
    super(props)
    this.state = {
      todos:
        [
          // { id: 1, description: 'Learn React', done: false, targetDate: new Date() },
          // { id: 2, description: 'Learn React2', done: false, targetDate: new Date() },
          // { id: 3, description: 'Learn React3', done: false, targetDate: new Date() },
        ],
      message: null
    }

    this.deleteTodoClicked = this.deleteTodoClicked.bind(this)
    this.updateTodoClicked = this.updateTodoClicked.bind(this)
    this.addTodoClicked = this.addTodoClicked.bind(this)
    this.refreshTodos = this.refreshTodos.bind(this)
  }

  componentDidMount() {
    console.log('componentDidMount')
    this.refreshTodos();
    console.log(this.state);
  }

  refreshTodos() {
    let username = AuthenticationService.getLoggedInUserName()
    TodoDataService.retrieveAllTodos(username)
      .then(
        response => {
          //console.log(response)
          this.setState({todos: response.data})
        }
      )
  }

  deleteTodoClicked(id) {
    let username = AuthenticationService.getLoggedInUserName()
    //console.log(id + " " + username)
    TodoDataService.deleteTodo(username, id)
      .then(
        response => {
          this.setState({message: `Delete of todo ${id} Successful`})
          this.refreshTodos()
        }
      )
  }

  updateTodoClicked(id) {
    console.log('update')
    this.props.history.push(`/todos/${id}`)
    // let username = AuthenticationService.getLoggedInUserName()
    // TodoDataService.deleteTodo(username, id)
    //   .then(
    //     response => {
    //       this.setState({message: `Delete of todo ${id} Successful`})
    //       this.refreshTodos()
    //     }
    //   )
  }

  addTodoClicked() {
    console.log('addclicked')
    this.props.history.push('/todos/-1')
  }

  render() {
    return (
      <div>
        <h1>List Todos</h1>
        {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th>id</th>
                <th>description</th>
                <th>Target Date</th>
                <th>Is Completed?</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.todos.map(
                  todo =>
                    <tr>
                      <td>{todo.id}</td>
                      <td>{todo.description}</td>
                      <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                      <td>{todo.done.toString()}</td>
                      <td><button className="btn btn-success" onClick={() => this.updateTodoClicked(todo.id)}>Update</button></td>
                      <td><button className="btn btn-warning" onClick={() => this.deleteTodoClicked(todo.id)}>Delete</button></td>
                    </tr>

                )

              }
            </tbody>
          </table>
          <dlv className="row">
            <button className="btn btn-success" onClick={()=>this.addTodoClicked()}>Add</button>
          </dlv>
        </div>
      </div>
    )
  }
}

export default ListTodosComponent