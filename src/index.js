import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import counter from './reducers'
import App from './containers/App'

// 创建store对象
const store = createStore(counter) // store对象管理reducer, 内部会自动首次调用reducer, 得到初始状态
/*
store对象内部包含2个重要东西
reducer函数
state
 */
/*

// 创建action的函数
const incrementCreator = number => ({type: 'INCREMENT', number})
const decrementCreator = number => ({type: 'DECREMENT', number})

// 通知store更新状态的函数
const increment = number => store.dispatch(incrementCreator(number))
const decrement = number => store.dispatch(decrementCreator(number))
*/

// 渲染Counter组件标签到页面
ReactDOM.render(
  (
    <Provider store={store}>
      <App/>
    </Provider>
  ),
  document.getElementById('root')
)
