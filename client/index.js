import ReactDOM from 'react-dom'
import React from 'react'
import genApp from './App'
import preApp from './App/'
const App = genApp(preApp);
const rootEl = document.getElementById('root')

ReactDOM.render(<App />
  ,
  rootEl
)

var store = require('./App').oldStore;

if (module.hot) {
  // Whenever a new version of App.js is available
  module.hot.accept('./App', function () {
    // Require the new version and render it instead
   var NextApp = require('./App').default(preApp, store);
    ReactDOM.render(<NextApp />, rootEl)
  })
}