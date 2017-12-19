import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Header from '../components/Header'
import Main from '../components/Main'
import Footer from '../components/Footer'
import * as TodoActions from '../actions'

class App extends Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
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