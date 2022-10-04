import {ReactLocation, Router} from '@tanstack/react-location'

import {history} from '@/configure-store'

import NavigationItemComponent, {LEVELS} from '../index'

const location = new ReactLocation({history})
const NavigationItem = ({isActive, ...props}) => {
  // eslint-disable-next-line no-ternary
  const to = isActive ? location.current.pathname : '/foo'

  return (
    <Router routes={[]} location={location}>
      <NavigationItemComponent {...props} to={to} />
    </Router>
  )
}
NavigationItem.args = {
  children: 'Navigation Item',
  hasSublevel: false,
  isActive: false,
  isDisabled: false,
  level: LEVELS.ONE
}

export {NavigationItem}
export default {
  argTypes: {
    children: {
      control: {type: 'text'}
    },
    hasSublevel: {
      control: {type: 'boolean'}
    },
    isActive: {
      control: {type: 'boolean'},
      description: 'Simulating a route match'
    },
    isDisabled: {
      control: {type: 'boolean'}
    },
    level: {
      control: {type: 'select'},
      options: Object.values(LEVELS)
    }
  },
  component: NavigationItemComponent,
  parameters: {
    backgrounds: {
      default: 'gray-medium',
      values: [
        {name: 'primary', value: '#0a3064'},
        {name: 'gray-medium', value: '#BBBBBB'},
        {name: 'white', value: '#ffffff'}
      ]
    }
  },
  title: 'Design System/atoms/Navigation Item'
}
