import {ADD_TODO, DELETE_TODO, COMPLETE_ALL, CLEAR_COMPLETED, TOGGLE_TODO, RECEIVER_TODOS} from '../constants/actionTypes'
import storageUtil from '../util/storageUtil'
export const addTodo = title => ({type: ADD_TODO, title})
export const deleteTodo = index => ({type: DELETE_TODO, index})
export const completeAll = isChecked => ({type: COMPLETE_ALL, isChecked})
export const clearCompleted = () => ({type: CLEAR_COMPLETED})
export const toggleTodo = index => ({type: TOGGLE_TODO, index})

// 异步action creator
export const readTodos = () => dispatch => {
  setTimeout(() => {
    const todos = storageUtil.fetch()
    dispatch({type: RECEIVER_TODOS, todos})
  }, 1000)
}