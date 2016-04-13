import ReactDOM from 'react-dom'
import React from 'react'
import genApp from './App'
import preApp from './App/index2'
const App = genApp(preApp);
const rootEl = document.getElementById('root')

ReactDOM.render(<App />
  ,
  rootEl
)