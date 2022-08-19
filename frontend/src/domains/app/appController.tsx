import React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from 'react-redux'
import {ReduxRouter} from '@lagunovsky/redux-react-router'
import 'tailwindcss/tailwind.css'

import {createPumpkinStore, history} from './redux/redux-store'
import MainSwitch from './routing/main-switch'

const pumpkinStore = createPumpkinStore()

export default function appController() {
  const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
  root.render(
    <Provider store={pumpkinStore}>
      <ReduxRouter history={history} children={<MainSwitch />} />
    </Provider>
  )
}
