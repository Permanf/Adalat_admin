import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { rootReducer } from './reducers/rootReducer'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../redux/sagas/index'

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(rootReducer,
    composeWithDevTools(
        applyMiddleware(sagaMiddleware)
    ),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

sagaMiddleware.run(rootSaga)


window.store = store
