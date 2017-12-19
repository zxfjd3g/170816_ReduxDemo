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