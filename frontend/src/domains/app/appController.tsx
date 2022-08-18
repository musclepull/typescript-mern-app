import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {ReduxRouter} from '@lagunovsky/redux-react-router'
import 'tailwindcss/tailwind.css'

import {createPumpkinStore, history} from './redux/redux-store'
import MainSwitch from './routing/main-switch'

const pumpkinStore = createPumpkinStore()

export default function appController() {
  function render() {
    ReactDOM.render(
      <Provider store={pumpkinStore}>
        <ReduxRouter history={history} children={<MainSwitch />} />
      </Provider>,
      document.getElementById('root')
    )
  }

  render()
}
