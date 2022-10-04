import {defineMessages} from 'react-intl'

const scope = 'organisms.reload-prompt'

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Neue Inhalte verfügbar',
    description: 'content updates title'
  },
  content: {
    id: `${scope}.content`,
    defaultMessage:
      'Wir haben Neuigkeiten für Sie. Klicken Sie auf Aktualisieren, um die Aktualisierungen zu übernehmen.',
    description: 'tell users to refresh the web-app to apply content updates'
  },
  refresh: {
    id: `${scope}.refresh`,
    defaultMessage: 'Aktualisieren',
    description: 'refresh cta'
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Abbrechen',
    description: 'cancel cta'
  }
})
