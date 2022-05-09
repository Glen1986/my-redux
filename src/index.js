import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import App from './App'
import { reducer } from './features/todos'
import { asyncMiddleware } from './middlewares/async'
import { Provider } from 'react-redux'
const store = createStore(reducer, applyMiddleware(asyncMiddleware))

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
)
