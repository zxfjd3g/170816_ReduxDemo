import React from 'react'
import ReactDOM from 'react-dom'
import Counter from './components/Counter'
import counter from './reducers'
import {createStore} from 'redux'

// 根据counter函数创建store对象
const store = createStore(counter)
// 定义创建action对象的函数
const incrementAction = (number) => ({type: 'INCREMENT', number})
const decrementAction = (number) => ({type: 'DECREMENT', number})
// 定义通过store更新状态的函数
const increment = (number) => {store.dispatch(incrementAction(number))}
const decrement = (number) => {store.dispatch(decrementAction(number))}
// 定义渲染根组件标签的函数
const render = () => {
  ReactDOM.render(
    <Counter count={store.getState()} increment={increment} decrement={decrement}/>,
    document.getElementById('root')
  )
}
// 初始化渲染
render()
// 注册(订阅)监听, 一旦状态发生改变, 自动重新渲染
store.subscribe(render)


