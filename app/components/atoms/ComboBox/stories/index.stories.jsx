import {faker} from '@faker-js/faker'
import capitalize from 'lodash/capitalize'

import ComboBoxComponent from '../index'

const Template = props => <ComboBoxComponent {...props} />

const options = [...new Array(8)].map(() => ({
  isDisabled: faker.datatype.boolean(),
  label: capitalize(faker.lorem.words(3)),
  value: faker.datatype.uuid()
}))

const ComboBox = Template.bind({})
ComboBox.args = {
  className: 'w-[200px]',
  isClearable: false,
  isDisabled: false,
  isMulti: false,
  options,
  placeholder: 'Placeholder',
  value: null
}

export {ComboBox}
export default {
  argTypes: {
    onChange: {
      action: 'onChange'
    }
  },
  component: ComboBoxComponent,
  title: 'Design System/atoms/ComboBox'
}
