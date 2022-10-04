import React from 'react'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import ReactDOM from 'react-dom'
import {HelmetProvider} from 'react-helmet-async'
import {IntlProvider} from 'react-intl'
import {Provider} from 'react-redux'
import '@szhsin/react-menu/dist/core.css'

import App from '@/components/App'
import ActionSubscription from '@/components/organisms/ActionSubscription'
import translations from '@/translations/de.json'

import store, {actionEmitter} from './configure-store'

import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <IntlProvider defaultLocale="de" locale="de" messages={translations}>
        <HelmetProvider>
          <ActionSubscription.Provider actionEmitter={actionEmitter}>
            <DndProvider backend={HTML5Backend}>
              <App />
            </DndProvider>
          </ActionSubscription.Provider>
        </HelmetProvider>
      </IntlProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
