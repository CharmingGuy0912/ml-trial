import {IntlProvider} from 'react-intl'

import '../app/index.css'
import messages from '../app/translations/de.json'
import Theme from '../app/components/atoms/Theme'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: {
    default: 'gray-light',
    values: [
      {name: 'gray-light', value: '#E5E7E7'},
      {name: 'gray-medium', value: '#BBBBBB'}
    ]
  },
  controls: {
    hideNoControlsWarning: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  }
}

export const decorators = [
  Story => (
    <IntlProvider defaultLocale="de" locale="de" messages={messages}>
      <div className="text-gray-dark text-base leading-none">
        <Theme />
        <Story />
      </div>
    </IntlProvider>
  )
]
