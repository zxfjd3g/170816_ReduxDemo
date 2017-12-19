import React, {Component, PropTypes} from 'react'
// 定义组件类
export default class Counter extends Component {

  // 给组件类添加属性
  static propTypes = {
    count: PropTypes.number,
    increment: PropTypes.func,
    decrement: PropTypes.func,
  }

  increment = () => {
    const number = this.refs.numberSelect.value*1
    this.props.increment(number)
  }
  decrement = () => {
    const number = this.refs.numberSelect.value*1
    this.props.decrement(number)
  }
  incrementIfOdd = () => {
    let count = this.props.count
    if(count%2===1) {
      const number = this.refs.numberSelect.value*1
      this.props.increment(number)
    }
  }
  incrementAsync = () => {
    setTimeout(() => {
      const number = this.refs.numberSelect.value*1
      this.props.increment(number)
    }, 1000)
  }


  render () {
    const {count} = this.props
    return (
      <div>
        <span>Clicked: {count} times</span>{' '}
        <select ref="numberSelect">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>{' '}
        <button onClick={this.increment}>+</button>{' '}
        <button onClick={this.decrement}>-</button>{' '}
        <button onClick={this.incrementIfOdd}>increment if odd</button>{' '}
        <button onClick={this.incrementAsync}>increment async</button>
      </div>
    )
  }
}



/*
组件对象是组件类的实例
 */