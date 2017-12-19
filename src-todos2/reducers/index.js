import {ADD_TODO, DELETE_TODO, COMPLETE_ALL, CLEAR_COMPLETED, TOGGLE_TODO, RECEIVER_TODOS} from '../constants/actionTypes'

const initState = [
  /*{title: '吃饭', complete: false},
  {title: '睡觉', complete: false},
  {title: '打代码', complete: false}*/
]

export default function todos(state = initState, action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        {
          title: action.title,
          complete: false
        },
        ...state
      ]
    case DELETE_TODO:

      return state.filter((todo, index) => {
        return index !== action.index
      })
    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return {
            title: todo.title,
            complete: !todo.complete
          }
        }
        return todo
      })

    case COMPLETE_ALL:
      return state.map(todo => {
        return {
          title: todo.title,
          complete: action.isChecked
        }
      })
    case CLEAR_COMPLETED:
      return state.filter((todo, index) => {
        return !todo.complete
      })
    case RECEIVER_TODOS:
      return action.todos
    default:
      return state
  }
}