import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Counter from '../components/Counter'
import * as actions from '../actions'

const mapStateToProps = (state) => ({
  count: state  // 对象中的属性会自动传递给Counter组件
})


const mapDispatchToProps = (dispatch) => ({
  /*increment: number => dispatch(actions.increment(number)),
  decrement: number => dispatch(actions.decrement(number))*/
  ...bindActionCreators(actions, dispatch)
})

// 向外暴露一个用react-redux连接产生的容器组件, 容器组件包装UI组件
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)
