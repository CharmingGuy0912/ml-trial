import SpinnerComponent, {SPINNER_TYPES} from '@/components/atoms/Spinner'

const Template = props => <SpinnerComponent {...props} />

const Spinner = Template.bind({})
Spinner.args = {
  className: '',
  type: SPINNER_TYPES.PRIMARY
}

export {Spinner}
export default {
  argTypes: {
    className: {
      control: {type: 'text'}
    },
    type: {
      control: {type: 'select'},
      options: Object.values(SPINNER_TYPES)
    }
  },
  component: SpinnerComponent,
  title: 'Design System/atoms/Spinner'
}
