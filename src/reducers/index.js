/*
reducer函数: 根据老的state和action返回一个新的state
state: 就代表count
 */
export default function counter(state=1, action) {
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