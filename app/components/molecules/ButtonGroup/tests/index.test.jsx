import Button, {BUTTON_TYPES} from '@/components/atoms/Button'
import render from '@/utils/test-utils/custom-render'

import ButtonGroup from '../index'

describe('ButtonGroup', () => {
  it('should match the snapshot', () => {
    const {container} = render(
      <ButtonGroup>
        <Button>Text</Button>
      </ButtonGroup>
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should favor parent ButtonGroup type over Button type prop', () => {
    const text = 'Button Text'

    const {container, getByText} = render(
      <ButtonGroup type={BUTTON_TYPES.CONTAINED}>
        <Button type={BUTTON_TYPES.OUTLINED}>{text}</Button>
      </ButtonGroup>
    )
    const button = getByText(text)

    expect(container.firstChild).toHaveClass('bg-gradient-primary')
    expect(button).not.toHaveClass('bg-gradient-primary')
  })
})
