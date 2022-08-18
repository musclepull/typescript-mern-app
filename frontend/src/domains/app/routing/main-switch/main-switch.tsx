import path from 'path'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from '../../view/Home'

export default function MainSwitch() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}
