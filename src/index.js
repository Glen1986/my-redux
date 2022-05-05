import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import App from './App'
import reportWebVitals from './reportWebVitals'

//funcion reducer
const store = createStore((state = 0, action) => {
    //action = {type: 'tipo de accion', payload: any}
    console.log({ state, action })
    return state
})
console.log({ store })

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
