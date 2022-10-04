import ButtonComponent, {
  BUTTON_SIZES,
  BUTTON_TYPES
} from '@/components/atoms/Button'
import UploadIcon from '@/components/atoms/Icon/Upload'

const Template = props => <ButtonComponent {...props} />
const Button = Template.bind({})
Button.args = {
  children: 'Button Content',
  isDisabled: false,
  isLoading: false,
  size: BUTTON_SIZES.MEDIUM,
  type: BUTTON_TYPES.CONTAINED
}

const icons = [UploadIcon].reduce(
  (acc, Icon) => ({
    ...acc,
    [Icon.displayName]: <Icon />
  }),
  {}
)

export {Button}
export default {
  argTypes: {
    children: {
      control: {type: 'text'}
    },
    endIcon: {
      control: {type: 'select'},
      mapping: icons,
      options: Object.keys(icons)
    },
    isDisabled: {
      control: {type: 'boolean'}
    },
    onClick: {
      action: 'onClick'
    },
    size: {
      control: {type: 'select'},
      options: Object.values(BUTTON_SIZES)
    },
    startIcon: {
      control: {type: 'select'},
      mapping: icons,
      options: Object.keys(icons)
    },
    type: {
      control: {type: 'select'},
      options: Object.values(BUTTON_TYPES)
    }
  },
  component: ButtonComponent,
  title: 'Design System/atoms/Button'
}
