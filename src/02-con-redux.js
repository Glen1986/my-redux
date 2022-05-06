import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const reducer = (state = 0, action) => {
    console.log({ action, state })
    switch (action.type) {
        case 'increm':
            return state + 1
        case 'decrem':
            return state - 1
        case 'set':
            return action.payload
        default:
            return state
    }
}
function App() {
    const [valor, setValor] = useState(0)
    const dispatch = useDispatch()
    const state = useSelector((state) => state)
    const set = () => {
        dispatch({ type: 'set', payload: valor })
        setValor('')
    }

    return (
        <div>
            Cerdo Mojado
            <p>contador:{state} </p>
            <button onClick={() => dispatch({ type: 'increm' })}>Increm</button>
            <button onClick={() => dispatch({ type: 'decrem' })}>decrem</button>
            <button onClick={set}>set</button>
            <input
                value={valor}
                onChange={(e) => setValor(Number(e.target.value))}
            />
        </div>
    )
}

export default App
