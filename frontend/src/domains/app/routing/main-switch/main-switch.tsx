import React from 'react'
import {Route, Routes} from 'react-router'
import Home from '../../view/Home'
import Login from '../../view/Login'
import LayoutComponent from '../../components/layout'

export default function MainSwitch() {
  const loggedIn = true

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <LayoutComponent>
            <Home />
          </LayoutComponent>
        }
      />
    </Routes>
  )
}
