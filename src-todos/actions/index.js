import {ADD_TODO, DELETE_TODO, COMPLETE_ALL, CLEAR_COMPLETED, TOGGLE_TODO, RECEIVER_TODOS} from '../constants/actionTypes'
export const addTodo = title => ({type: ADD_TODO, title})
export const deleteTodo = index => ({type: DELETE_TODO, index})
export const completeAll = isChecked => ({type: COMPLETE_ALL, isChecked})
export const clearCompleted = () => ({type: CLEAR_COMPLETED})
export const toggleTodo = index => ({type: TOGGLE_TODO, index})
