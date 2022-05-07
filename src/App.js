import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
const initialState = {
    entities: [],
}
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'todo/add': {
            return {
                ...state,
                entities: state.entities.concat({ ...action.payload }),
            }
        }
        case 'todo/completed': {
            const newTodos = state.entities.map((todo) => {
                if (todo.id === action.payload.id) {
                    return { ...todo, completed: !todo.completed }
                }
                return todo
            })
            return {
                ...state,
                entities: newTodos,
            }
        }
        default:
            return state
    }
}
const TodoItem = ({ todo }) => {
    const dispatch = useDispatch()
    return (
        <li
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            onClick={() => dispatch({ type: 'todo/completed', payload: todo })}
        >
            {todo.title}
        </li>
    )
}
const App = () => {
    const [value, setValue] = useState()
    const dispatch = useDispatch()
    const state = useSelector((x) => x)

    const submit = (e) => {
        e.preventDefault()
        if (!value.trim()) {
            return
        }
        const id = Math.random().toString(36)
        const todo = { title: value, completed: false, id }
        dispatch({ type: 'todo/add', payload: todo })
        setValue('')
    }

    return (
        <div>
            <form onSubmit={submit}>
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </form>
            <button onClick={() => dispatch({ type: 'todo/add' })}>
                todos
            </button>
            <button>completados</button>
            <button>incompletos</button>
            <ul>
                {state.entities.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} />
                ))}
            </ul>
        </div>
    )
}
export default App
