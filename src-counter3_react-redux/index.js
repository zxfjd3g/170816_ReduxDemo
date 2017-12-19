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