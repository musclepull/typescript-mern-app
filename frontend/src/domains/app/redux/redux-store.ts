import {routerMiddleware} from 'connected-react-router'
import {createBrowserHistory, createMemoryHistory} from 'history'
import {applyMiddleware, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly'
import thunk from 'redux-thunk'

import pumpkinReducer from './reducer'

// for running tests in node environment instead of jsdom
export const history = createBrowserHistory()

export function createPumpkinStore(initialState = {}) {
  const reducer = pumpkinReducer(history)
  const middleware = composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history)))

  return createStore(reducer, initialState, middleware)
}
