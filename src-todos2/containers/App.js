import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Header from '../components/Header'
import Main from '../components/Main'
import Footer from '../components/Footer'
import * as TodoActions from '../actions'
import storageUtil from '../util/storageUtil'

class App extends Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  }
  
  // 当接收到新的属性数据时回调
  componentWillReceiveProps (newProps) {
    console.log(newProps.todos)
    // 保存最新的todos数据
    storageUtil.save(newProps.todos)
  }

  componentDidMount () {
    // 初始化读取local中保存的todos数据(内部是异步的操作)
    this.props.actions.readTodos()
  }

  render () {
    const {todos, actions} = this.props
    return (
      <div className="todo-container">
        <div className="todo-wrap">
          <Header addTodo={actions.addTodo}></Header>
          <Main todos={todos} actions={actions}></Main>
          <Footer todos={todos} actions={actions}></Footer>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  todos: state
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TodoActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App)