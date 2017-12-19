import React, {Component, PropTypes} from 'react'

export default class Footer extends Component {

  static propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  }

  render () {
    const {todos, actions} = this.props
    const completeLength = todos.reduce((preTotal, todo) => {
      return preTotal + (todo.complete ? 1 : 0)
    }, 0)

    const isChecked = todos.length===completeLength && completeLength>0
    const display = completeLength>0 ? 'block' : 'none'
    return (
      <div className="todo-footer">
        <label>
          <input type="checkbox" checked={isChecked}
                 onChange={(event) => actions.completeAll(event.target.checked)}/>
        </label>
        <span>
          <span>已完成{completeLength}</span> / 全部{todos.length}
        </span>
        <button className="btn btn-danger" style={{display}} onClick={actions.clearCompleted}>清除已完成任务</button>
      </div>
    )
  }
}