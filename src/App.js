import { useState } from 'react'
import { combineReducers } from 'redux'
import { useDispatch, useSelector } from 'react-redux'

export const asyncMiddleware = (store) => (next) => (action) => {
    // console.log(store, next, action)
    if (typeof action === 'function') {
        return action(store.dispatch, store.getState)
    }
    return next(action)
}
const setPending = () => ({ type: 'todos/pending' })
const setFulfilled = (payload) => ({ type: 'todos/fulfilled', payload })
const setError = (e) => ({ type: 'todos/error', error: e.message })
const setComplete = (payload) => ({ type: 'todo/complete', payload })
const setAdd = (payload) => ({ type: 'todo/add', payload })
const setFilter = (payload) => ({ type: 'filter/set', payload })
// const setFulfilled = (payload) => ({ type: 'todos/fulfilled', payload })

export const fetchThunk = () => async (dispatch) => {
    // console.log('soy un thunk', dispatch)
    dispatch(setPending())
    try {
        const response = await fetch(
            'https://jsonplaceholder.typicode.com/todos'
        )
        const data = await response.json()
        const todos = data.slice(0, 10)
        // dispatch({ type: 'todos/fulfiled', payload: todos })
        dispatch(setFulfilled(todos))
        // console.log(todos)
    } catch (e) {
        dispatch(setError())
    }
}

export const filterReducer = (state = 'all', action) => {
    switch (action.type) {
        case 'filter/set':
            return action.payload
        default:
            return state
    }
}
const initialFetching = { loading: 'idle', error: null }
export const fetchingReducer = (state = initialFetching, action) => {
    switch (action.type) {
        case 'todos/pending': {
            return { ...state, loading: 'pending' }
        }
        case 'todos/fulfilled': {
            return { ...state, loading: 'succeded' }
        }
        case 'todos/error': {
            return { error: action.error, loading: 'rejected' }
        }
        default:
            return state
    }
}

export const todosReducer = (state = [], action) => {
    switch (action.type) {
        case 'todos/fulfilled': {
            return action.payload
        }
        case 'todo/add': {
            return state.concat({ ...action.payload })
        }
        case 'todo/complete': {
            const newTodos = state.map((todo) => {
                if (todo.id === action.payload.id) {
                    return { ...todo, completed: !todo.completed }
                }
                // console.log(todo)
                return todo
            })
            return newTodos
        }
        default:
            return state
    }
}

export const reducer = combineReducers({
    todos: combineReducers({
        status: fetchingReducer,
        entities: todosReducer,
    }),
    filter: filterReducer,
})

const selectTodos = (state) => {
    const {
        todos: { entities },
        filter,
    } = state
    // console.log(entities, filter)
    if (filter === 'complete') {
        return entities.filter((todo) => todo.completed)
    }
    if (filter === 'incomplete') {
        return entities.filter((todo) => !todo.completed)
    }
    return entities
}

const selectStatus = (state) => state.todos.status
const TodoItem = ({ todo }) => {
    const dispatch = useDispatch()
    return (
        <li
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            onClick={() => dispatch(setComplete(todo))}
        >
            {todo.title}
        </li>
    )
}
const App = () => {
    const [value, setValue] = useState()
    const dispatch = useDispatch()
    const todos = useSelector(selectTodos)
    const status = useSelector(selectStatus)

    const submit = (e) => {
        e.preventDefault()
        if (!value.trim()) {
            return
        }
        const id = Math.random().toString(36)
        const todo = { title: value, completed: false, id }
        dispatch(setAdd(todo))
        setValue('')
    }
    if (status.loading === 'pending') {
        return <p>Cargando...</p>
    }
    if (status.loading === 'rejected') {
        return <div>{status.error}</div>
    }
    return (
        <div>
            <form onSubmit={submit}>
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </form>
            <button onClick={() => dispatch(setFilter('all'))}>todos</button>
            <button onClick={() => dispatch(setFilter('complete'))}>
                completados
            </button>
            <button onClick={() => dispatch(setFilter('incomplete'))}>
                incompletos
            </button>
            <button onClick={() => dispatch(fetchThunk())}>Fecth</button>
            <ul>
                {todos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} />
                ))}
            </ul>
        </div>
    )
}
export default App
