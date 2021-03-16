import React, {Component, useState} from 'react'
import PropTypes from 'prop-types'

import './Counter.css'

class Counter extends Component {
  
  constructor() {
    super();

    this.state = {
      counter: 0
    }

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.reset = this.reset.bind(this);
  }
  
  render() {

    return (
      <div className="counter">
          <CounterButton by={1} incrementMethod={this.increment} decrementMethod={this.decrement}/>
          <CounterButton by={5} incrementMethod={this.increment} decrementMethod={this.decrement}/>
          <CounterButton by={10} incrementMethod={this.increment} decrementMethod={this.decrement}/>
          <span className="count">{this.state.counter}</span>
          <div><button className="reset" onClick={this.reset}>Reset</button></div>
      </div>
    );

  }

  reset() {
    this.setState(
      (prevState) => {
        return{counter: 0}
      }
    );
  }

  increment(by) {
    // this.setState({
    //   counter: this.state.counter + by
    // });
    this.setState(
      (prevState) => {
        return {counter: prevState.counter + by}
      }
    );
    console.log(`increment by parent - ${by}`);
  }

  decrement(by) {
    // this.setState({
    //   counter: this.state.counter + by
    // });
    this.setState(
      (prevState) => {
        return {counter: prevState.counter - by}
      }
    );
    console.log(`decrement by parent - ${by}`);
  }

}

class CounterButton extends Component {

  constructor() {
    super();

    this.state = {
      counter: 0
    }

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    //this.reset = this.reset.bind(this);
  }

  render() {
    const style = {fontSize: "30px", padding: "15px 30px"};
    return (
        <div className="counter">
            <button onClick={this.increment}>+{this.props.by}</button>
            <button onClick={this.decrement}>-{this.props.by}</button>
            {/* <span className="count">{this.state.counter}</span> */}
            {/* <span style={style}>{this.state.counter}</span>
            <span style={{color: "red", fontSize: "80px", padding: "20px 40px"}}>{this.state.counter}</span> */}
        </div>
    );
  }

  increment() { 
    this.setState({
      counter: this.state.counter + this.props.by
    });
    this.props.incrementMethod(this.props.by);
  }

  decrement() { 
    this.setState({
      counter: this.state.counter - this.props.by
    });
    this.props.decrementMethod(this.props.by);
  }

}

Counter.propTypes = {
  by: PropTypes.number
}

Counter.defaultProps = {
  by: 15
}



// function Counter() {
//   const [counter, setCounter] = useState(0);
//   return (
//     <div className="counter">
//       <button onClick={increment}>+1</button>
//       <span className="count">{counter}</span>
//     </div>
//   );

//   function increment() {
//     setCounter(counter + 1);
//   }
// }



export default Counter