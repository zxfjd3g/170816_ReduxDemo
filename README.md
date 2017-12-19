# 1. redux是什么
	github站点: https://github.com/reactjs/redux
	在线文档: http://www.redux.org.cn/
	优秀教程: 阮一峰redux系列教程(3篇)
	作用: 对应用中多组件的状态进行集中式的管理(与vuex类似)
	说明: 
		redux并不是专门用于react中的库, 本质上它是一个独立的第三方库, 与任何库都是可以配合使用的, 只是与react配合使用最常见
		与react配置使用, 经常会使使用react-redux插件(连接react和redux, 简化redux的使用)
	
# 2. redux的工作流程
![](http://www.ruanyifeng.com/blogimg/asset/2016/bg2016091802.jpg)


# 3. 什么情况下需要使用redux
	总体原则: 能不用就不用, 如果不用状态管理比较吃力才考虑使用redux
	某个组件的状态，需要共享
	某个状态需要在任何地方都可以拿到
	一个组件需要改变全局状态
	一个组件需要改变另一个组件的状态

# 4. redux的核心API
## 1). createStore()
	创建包含指定reducer的store对象
	编码:
		import {createStore} from 'redux'
		import counter from './reducers'
		const store = createStore(counter)
## 2). store对象
	redux库最核心的管理对象
	它内部维护着:
		state
		reducer
	核心方法:
		getState()
		dispatch(action)
		subscribe(listener)
	编码:
		store.getState()
		store.dispatch({type:'INCREMENT', number})
		store.subscribe(render)
## 3). bindActionCreators()
	用来简化dispatch()调用的工具函数
	编码:
		const mapDispatchToProps = (dispatch) => ({
		  /*
		  increment: (number) => dispatch(countActions.increment(number)),
		  decrement: (number) => dispatch(countActions.decrement(number)),
		  */
		  ...bindActionCreators(countActions, dispatch)
		})
		
# 5. redux的三个核心概念
## 1). action
	1.标识要进行行为的对象
	2.包含2个方面的属性
		type: 标识属性, 值为字符串, 唯一, 必要属性
		xxx: 数据属性, 值类型任意, 可选属性
	3.例子:
		const action = {
			type: 'INCREMENT',
			number: 2
		}
	4.Action Creator(Action的创建函数)
		const incrementAction = (number) => ({type: 'INCREMENT', number})
## 2). reducer
	1.处理action, 产生新的state的纯函数
	2.样例
		export default function counter(state = 0, action) {
		  switch (action.type) {
		    case 'INCREMENT':
		      return state + action.number
		    case 'DECREMENT':
		      return state - action.number
		    default:
		      return state
		  }
		}
	3.注意
		返回一个新的状态
		不要修改原来的状态
## 3). store
	1.将state,action与reducer联系在一起的对象
	2.如何得到此对象?
		import {createStore} from 'redux'
		import reducer from './reducers'
		const store = createStore(reducer)
	3.此对象的功能?
		getState(): 得到state
		dispatch(action): 分发action, 触发reducer调用, 更新state
		subscribe(listener): 注册监听
		内部维持应用的 state

# 6. 使用redux编写应用
## 1). reducers/index.js
	export default function counter(state = 0, action) {
	  console.log('counter', state, action)
	  switch (action.type) {
	    case 'INCREMENT':
	      return state + action.number
	    case 'DECREMENT':
	      return state - action.number
	    default:
	      return state
	  }
	}
## 2). components/Counter.jsx
	import React, {Component, PropTypes} from 'react'
	
	export default class Counter extends Component {
	
	  static propTypes = {
	    count: PropTypes.number.isRequired,
	    increment: PropTypes.func.isRequired,
	    decrement: PropTypes.func.isRequired
	  }
	
	  increment = () => {
	    const number = this.refs.numSelect.value*1
	    this.props.increment(number)
	  }
	
	  decrement = () => {
	    const number = this.refs.numSelect.value*1
	    this.props.decrement(number)
	  }
	
	  incrementIfOdd = () => {
	    let count = this.props.count
	    if(count%2===1) {
	      const number = this.refs.numSelect.value*1
	      this.props.increment(number)
	    }
	  }
	
	  incrementAsync = () => {
	    setTimeout(() => {
	      const number = this.refs.numSelect.value*1
	      this.props.increment(number)
	    }, 1000)
	  }
	
	  render () {
	    const {count} = this.props
	
	    return (
	      <div>
	        <p>
	          click {count} times {' '}
	        </p>
	        <select ref="numSelect">
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

## 3). index.js
	import React from 'react'
	import ReactDOM from 'react-dom'
	import {createStore} from 'redux'
	import Counter from './components/Counter'
	import counter from './reducers'
	
	
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

# 7. react-redux
## 1). 是什么?
	专门用来简化react中使用redux的库
	用来连接react与redux
## 2). React-Redux将所有组件分成两大类
	1.UI组件
		只负责 UI 的呈现，不带有任何业务逻辑
		没有状态（即不使用this.state这个变量）
		所有数据都由参数（this.props）提供
		不使用任何 Redux 的 API
		一般保存在components文件夹下
	2.容器组件
		负责管理数据和业务逻辑，不负责UI的呈现
		带有内部状态
		使用 Redux 的 API
		一般保存在containers文件夹下
## 3). React-Redux相关API
	1.connect()
		用于从 UI 组件生成容器组件
		import { connect } from 'react-redux'
		connect(
		  mapStateToprops,
		  mapDispatchToProps
		)(Counter)
	2.mapStateToprops(state)
		将外部的数据（即state对象）转换为UI组件的属性参数
		const mapStateToprops = function (state) {
		  return {
		    value: state
		  }
		}
	3.mapDispatchToProps(dispatch)
		将用户发出的动作变为Action对象，从UI组件传出去
		const mapDispatchToProps = function (dispatch) {
		  return {
		    increment: (number) => dispatch(incrementAction(number)),
		    decrement: (number) => dispatch(decrementAction(number))
		  }
		}
	4.<Provider>组件
		让所有组件都可以得到state数据
		<Provider store={store}>
			<Counter />
		</Provider>
# 8. 使用redux + react-redux编写应用
## 1). reducers/index.js(没有变化)
	export default function counter(state = 0, action) {
	  if (action.type === 'INCREMENT') {
	    return state + action.number
	  } else if (action.type === 'DECREMENT') {
	    return state - action.number
	  } else {
	    return state
	  }
	}
## 2). components/Counter.jsx(没有变化)
	import React, {Component, PropTypes} from 'react'
	
	export default class Counter extends Component {
	  static propTyes = {
	    count: PropTypes.number.isRequired,
	    increment: PropTypes.func.isRequired,
	    decrement: PropTypes.func.isRequired
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
	    const count = this.props.count
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
	        <p>click {count} times</p>
	        <select ref="numberSelect">
	          <option value="1">1</option>
	          <option value="2">2</option>
	          <option value="3">3</option>
	        </select>{' '}
	        <button onClick={this.increment}>+</button> {' '}
	        <button onClick={this.decrement}>-</button> {' '}
	        <button onClick={this.incrementIfOdd}>increment if odd</button> {' '}
	        <button onClick={this.incrementAsync}>increment async</button> {' '}
	      </div>
	    )
	  }
	}

## 3). actions/index.js
	//增加的actionCreator(交流时有时会说成增加的action)
	export const increment = (number) => ({type: 'INCREMENT', number})
	//减少的actionCreator(交流时有时会说成减少的action)
	export const decrement = (number) => ({type: 'DECREMENT', number})

## 4). containers/App.js
	import React from 'react'
	import {bindActionCreators} from 'redux'
	import {connect} from 'react-redux'
	import Counter from '../components/Counter'
	import * as countActions from '../actions'
	
	// 映射状态的函数
	const mapStateToProps = (state) => ({
	  count: state
	})
	
	// 映射分发更新状态行为的函数
	const mapDispatchToProps = (dispatch) => ({
	  /*
	  increment: (number) => dispatch(countActions.increment(number)),
	  decrement: (number) => dispatch(countActions.decrement(number)),
	  */
	  // 根据actionCreator绑定生成对应的分发的行为
	  ...bindActionCreators(countActions, dispatch)
	})
	
	// 向外暴露通过connect包装Counter组件生成的容器组件
	export default connect(
	  mapStateToProps,
	  mapDispatchToProps
	)(Counter)

## 5). index.js
	import React from 'react'
	import ReadDOM from 'react-dom'
	import {createStore} from 'redux'
	import {Provider} from 'react-redux'
	
	import App from './containers/App'
	import counter from './reducers'
	
	// 创建包含counter的store对象
	const store = createStore(counter)
	// 初始化渲染包含Counter标签的Provider标签
	ReadDOM.render(
	  (
	    <Provider store={store}>
	      <App/>
	    </Provider>
	  ),
	  document.getElementById('root')
	)

# 9. 相关重要知识
## 1). 纯函数
	一类特别的函数: 只要是同样的输入，必定得到同样的输出
	必须遵守以下一些约束
		不得改写参数
		不能调用系统 I/O 的API
		不能调用Date.now()或者Math.random()等不纯的方法，因为每次会得到不一样的结果
	reducer函数必须是一个纯函数

## 2). 高阶函数
	理解:
		一类特别的函数
			1.参数是函数
			2.返回是函数
	例如: 
		数组的map()/filter()/reduce()/find()
		ajax请求函数
		定时器设置函数
		react-redux中的connect函数
	作用: 
		能实现更加动态, 更加可扩展的功能