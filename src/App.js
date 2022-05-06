import { useDispatch, useSelector } from 'react-redux'
const initialState = {
    entities: [],
}
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'todo/add': {
            console.log('reducer')
            return {
                ...state,
                entities: [{}],
            }
        }
    }
    return state
}
const App = () => {
    const dispatch = useDispatch()
    const state = useSelector((x) => x)
    console.log(state, 'rendering')
    return (
        <div>
            <form>
                <input type="text" />
            </form>
            <button onClick={() => dispatch({ type: 'todo/add' })}>
                todos
            </button>
            <button>completados</button>
            <button>incompletos</button>
            <ul>
                <li>todo1</li>
                <li>todo2</li>
            </ul>
        </div>
    )
}
export default App
