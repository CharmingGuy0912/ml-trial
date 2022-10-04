import Component from '../index'

const DatePicker = props => {
  // eslint-disable-next-line no-ternary
  const value = props.value ? new Date(props.value) : null

  return <Component {...props} value={value} />
}
DatePicker.args = {
  value: null
}

export {DatePicker}
export default {
  argTypes: {
    onChange: {},
    value: {
      control: {type: 'date'}
    }
  },
  component: Component,
  title: 'Design System/molecules/Date Picker'
}
