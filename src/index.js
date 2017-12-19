import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import counter from './reducers'
import Counter from './components/Counter'

// 创建store对象
const store = createStore(counter) // store对象管理reducer, 内部会自动首次调用reducer, 得到初始状态
/*
store对象内部包含2个重要东西
reducer函数
state
 */

const increment = number => store.dispatch({type: 'INCREMENT', number})
const decrement = number => store.dispatch({type: 'DECREMENT', number})

// 渲染Counter组件标签到页面
function render () {
  ReactDOM.render(
    <Counter count={store.getState()} increment={increment} decrement={decrement}/>,
    document.getElementById('root')
  )
}

// 初始化渲染
render()

// 订阅(绑定)监听: 用在状态变化后, 重新渲染组件标签
store.subscribe(render)