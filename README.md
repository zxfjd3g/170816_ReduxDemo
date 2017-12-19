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

# 4. redux的三个核心概念
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
		function increment(number) {
			return {
				type: 'INCREMENT',
				number
			}
		}
## 2). reducer
	1.处理action, 产生新的state的纯函数
	2.样例
		function counter(state = 0, action) {
		  if (action.type === 'INCREMENT') {
		    return state + action.number
		  } else if (action.type === 'DECREMENT') {
		    return state - action.number
		  } else {
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


# 纯函数
	一类特别的函数: 只要是同样的输入，必定得到同样的输出
	必须遵守以下一些约束
		不得改写参数
		不能调用系统 I/O 的API
		不能调用Date.now()或者Math.random()等不纯的方法，因为每次会得到不一样的结果