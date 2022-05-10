import { combineReducers } from 'redux'
import {
    mac,
    makeFetchingReducer,
    makeSetReducer,
    reduceReducers,
    makeCrudReducer,
} from './utils'

export const setPending = mac('todos/pending')

export const setFulfilled = mac('todos/fulfilled', 'payload')

export const setError = mac('todos/rejected', 'error')

export const setComplete = mac('todos/complete', 'payload')

export const setFilter = mac('filter/set', 'payload')

export const setAdd = mac('todo/add', 'payload')

export const fetchThunk = () => async (dispatch) => {
    // console.log('soy un thunk', dispatch)
    dispatch(setPending())
    try {
        const response = await fetch(
            'https://jsonplaceholder.typicode.com/todos'
        )
        const data = await response.json()
        // console.log(data)
        const todos = data.slice(0, 10)
        dispatch(setFulfilled(todos))
    } catch (e) {
        dispatch(setError(e.message))
    }
}

const fulfilledReducer = makeSetReducer(['todos/fulfilled'])

export const filterReducer = makeSetReducer(['filter/set'])
export const crudReducer = makeCrudReducer(['todo/add', 'todos/complete'])

export const todosReducer = reduceReducers(crudReducer, fulfilledReducer)

export const fetchingReducer = makeFetchingReducer([
    'todos/pending',
    'todos/fulfilled',
    'todos/rejected',
])

export const reducer = combineReducers({
    todos: combineReducers({
        entities: todosReducer,
        status: fetchingReducer,
    }),
    filter: filterReducer,
})

export const selectTodos = (state) => {
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

export const selectStatus = (state) => state.todos.status
