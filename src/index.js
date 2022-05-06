import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import App from './App'
import reportWebVitals from './reportWebVitals'

//funcion reducer
const store = createStore((state = 1, action) => {
    //action = {type: 'tipo de accion', payload: any}
    switch (action.type) {
        case 'action': {
            return action.payload
        }
        case 'increm': {
            return state + action.payload
        }
        case 'decrem': {
            return state - action.payload
        }
        default:
            return state
    }
})
console.log(store.getState())
store.dispatch({ type: 'increm', payload: 2 })
console.log(store.getState())
store.dispatch({ type: 'decrem', payload: 2 })
console.log(store.getState())
store.dispatch({ type: 'action', payload: 'weed' })
console.log(store.getState())
store.dispatch({ type: 'inrcrem', payload: 4 })
console.log(store.getState())

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
