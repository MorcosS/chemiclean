
import { applyMiddleware, createStore, compose } from 'redux'
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk'
import {rootReducer} from '../reducers/index'
const middlewareEnhancer = applyMiddleware(logger, thunkMiddleware)


const store = createStore(rootReducer, undefined, middlewareEnhancer)
export default store;