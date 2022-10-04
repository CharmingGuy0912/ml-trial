import DateInputComponent from '../index'

const Template = props => <DateInputComponent {...props} />
const DateInput = Template.bind({})
DateInput.args = {}

export {DateInput}
export default {
  argTypes: {
    value: {
      control: {type: 'text'}
    }
  },
  component: DateInputComponent,
  title: 'Design System/atoms/Date Input'
}
