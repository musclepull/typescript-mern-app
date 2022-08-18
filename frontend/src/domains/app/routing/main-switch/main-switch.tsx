import React from 'react'
import {Route, Routes} from 'react-router'
import Home from '../../view/Home'
import Login from '../../view/Login'

export default function MainSwitch() {
  const loggedIn = true

  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  )
}
