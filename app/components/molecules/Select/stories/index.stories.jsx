import SelectComponent from '../index'

const Template = props => <SelectComponent {...props} />

const Select = Template.bind({})
Select.args = {
  className: 'w-[200px] block',
  error: '',
  isDisabled: false,
  isRequired: false,
  label: 'Label',
  options: [
    {label: 'Option #1', value: 'option-1'},
    {label: 'Option #2', value: 'option-2'}
  ]
}

export {Select}
export default {
  argTypes: {
    onChange: {
      action: 'onChange'
    }
  },
  component: SelectComponent,
  title: 'Design System/molecules/Select'
}
