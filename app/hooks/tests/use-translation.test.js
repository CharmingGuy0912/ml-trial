import render from '@/utils/test-utils/custom-render'

import useTranslation from '../use-translation'

const TestComponent = props => useTranslation(props.text)
const renderComponent = (props = {}) => render(<TestComponent {...props} />)

describe('hooks', () => {
  describe('useTranslation', () => {
    it('should render the passed text', () => {
      const text = 'a text'
      const {container} = renderComponent({text})
      expect(container).toHaveTextContent(text)
    })

    it('should translate a passed message', () => {
      const text = {
        defaultMessage: 'a default message',
        id: 'a.message.id'
      }
      const {container} = renderComponent({text})
      expect(container).toHaveTextContent(text.defaultMessage)
    })
  })
})
