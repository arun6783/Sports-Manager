import React from 'react'
import ReactDOM from 'react-dom'
import Welcome from './pages/Welcome'

const App = () => (
  <React.StrictMode>
    <Welcome />
  </React.StrictMode>
)

ReactDOM.render(<App />, document.getElementById('root'))
