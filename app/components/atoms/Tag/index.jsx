import classNames from 'classnames'
import noop from 'lodash/noop'
import PropTypes from 'prop-types'

const TAG_COLORS = {
  BLUE: 'blue',
  EMERALD: 'emerald',
  GRAY: 'gray',
  GREEN: 'green',
  ORANGE: 'orange',
  RED: 'red',
  YELLOW: 'yellow'
}
const AVAILABLE_TAG_COLORS = Object.values(TAG_COLORS)

const TAG_COLORS_CLASSES = {
  [TAG_COLORS.GRAY]: 'bg-gray-light border-gray-medium',
  [TAG_COLORS.RED]: 'bg-red-light border-red-medium',
  [TAG_COLORS.ORANGE]: 'bg-orange-light border-orange-medium',
  [TAG_COLORS.YELLOW]: 'bg-yellow-light border-yellow-medium',
  [TAG_COLORS.BLUE]: 'bg-blue-light border-blue-medium',
  [TAG_COLORS.GREEN]: 'bg-green-light border-green-medium',
  [TAG_COLORS.EMERALD]: 'bg-emerald-light border-emerald-medium'
}

const Tag = ({children, ...props}) => (
  <div
    className={classNames(
      'border-[1px] rounded p-1.5 pt-0.5 pb-px',
      'inline-flex items-center gap-0.5',
      'font-badge-text',
      TAG_COLORS_CLASSES[props.color],
      props.className
    )}
    onClick={props.onClick}
    title={props.title}
  >
    {children}
  </div>
)

Tag.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.any,
  color: PropTypes.oneOf(AVAILABLE_TAG_COLORS),
  onClick: PropTypes.func,
  title: PropTypes.string
}

Tag.defaultProps = {
  className: null,
  color: TAG_COLORS.GRAY,
  onClick: noop,
  title: null
}

export {AVAILABLE_TAG_COLORS, TAG_COLORS}
export default Tag
