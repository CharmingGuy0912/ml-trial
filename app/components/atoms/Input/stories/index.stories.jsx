import SearchIcon from '@/components/atoms/Icon/Search'
import UploadIcon from '@/components/atoms/Icon/Upload'

import InputComponent from '../index'

const Input = props => <InputComponent {...props} />
Input.args = {
  hasError: false
}

const icons = [SearchIcon, UploadIcon].reduce(
  (acc, Icon) => ({
    ...acc,
    [Icon.displayName]: <Icon />
  }),
  {none: null}
)

export {Input}
export default {
  argTypes: {
    hasError: {},
    onChange: {
      action: 'onChange'
    },
    placeholder: {
      control: {type: 'text'}
    },
    startIcon: {
      control: {type: 'select'},
      mapping: icons,
      options: Object.keys(icons)
    },
    value: {
      control: {type: 'text'}
    }
  },
  component: InputComponent,
  title: 'Design System/atoms/Input'
}
