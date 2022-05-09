export const asyncMiddleware = (store) => (next) => (action) => {
    if (typeof action === 'function') {
        return action(store.dispatch, store.getState)
    }
    // console.log(store, next, action)

    return next(action)
}
