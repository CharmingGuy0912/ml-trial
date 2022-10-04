import Component from '../index'

const DateCyclePicker = props => {
  // eslint-disable-next-line no-ternary
  const value = props.value ? new Date(props.value) : null

  return <Component {...props} value={value} />
}
DateCyclePicker.args = {
  isConfirmable: false,
  value: null
}

export {DateCyclePicker}
export default {
  argTypes: {
    isConfirmable: {},
    onChange: {},
    value: {
      control: {type: 'date'}
    }
  },
  component: Component,
  title: 'Design System/molecules/Date Cycle Picker'
}
