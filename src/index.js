import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import App, { reducer, asyncMiddleware } from './App'
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
