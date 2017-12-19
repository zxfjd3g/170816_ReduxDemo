import React, {Component, PropTypes} from 'react'

export default class Header extends Component {

  static propTypes = {
    addTodo: PropTypes.func.isRequired
  }

  handleSave = (event) => {
    if(event.keyCode===13) {
      const title = this.refs.content.value.trim()
      if (!title) {
        return
      }
      this.props.addTodo(title)
      this.refs.content.value = ''
    }
  }

  render() {
    return (
      <div className="todo-header">
        <input type="text" placeholder="请输入你的任务名称，按回车键确认"
               onKeyUp={this.handleSave}
               ref="content"/>
      </div>
    )
  }
}