import {Outlet, ReactLocation, Router} from '@tanstack/react-location'
import React from 'react'

import ToastContainer from '@/components/atoms/ToastContainer'
import ReloadPrompt from '@/components/organisms/ReloadPrompt'
import {history} from '@/configure-store'
import EntitiesInjector from '@/injectors/entities/EntitiesInjector'

import Theme from './atoms/Theme'
import routes from './routes'

const location = new ReactLocation({history})

const App = () => (
  <>
    <Theme />
    <ToastContainer />
    <EntitiesInjector />
    <Router routes={routes} location={location}>
      <Outlet />
      <ReloadPrompt />
    </Router>
  </>
)

export default React.memo(App)
