import React, {Component, PropTypes} from 'react'
export default class Main extends Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  }

  clickDelete = (index) => {
    const {todos, actions} = this.props
    const title = todos[index].title
    if(window.confirm(`确定删除 ${title}`)) {
      actions.deleteTodo(index)
    }
  }

  render () {
    const {todos, actions} = this.props
    return (
      <ul className="todo-main">
        {
          todos.map((todo, index) => (
            <li key={index}>
              <label>
                <input type="checkbox" checked={todo.complete} onChange={() =>actions.toggleTodo(index)} />
                <span>{todo.title}</span>
              </label>
              <button className="btn btn-danger" onClick={this.clickDelete.bind(this, index)}>删除</button>
            </li>
          ))
        }
      </ul>
    )
  }
}