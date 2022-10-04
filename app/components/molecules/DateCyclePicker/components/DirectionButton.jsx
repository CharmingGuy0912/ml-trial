import classNames from 'classnames'
import {noop} from 'lodash'
import PropTypes from 'prop-types'

import ArrowBackIosIcon from '@/components/atoms/Icon/ArrowBackIos'

const DIRECTIONS = {
  LEFT: 'left',
  RIGHT: 'right'
}

const DirectionButton = props => (
  <button
    aria-label={props['aria-label']}
    className="w-[26px] transition-[border-color,color] text-gray-medium hover:text-gray-dark"
    onClick={props.onClick}
  >
    <ArrowBackIosIcon
      className={classNames('text-lg', {
        'rotate-180': props.direction === DIRECTIONS.RIGHT
      })}
    />
  </button>
)

DirectionButton.propTypes = {
  'aria-label': PropTypes.string,
  direction: PropTypes.oneOf(Object.values(DIRECTIONS)),
  onClick: PropTypes.func
}

DirectionButton.defaultProps = {
  'aria-label': null,
  direction: DIRECTIONS.LEFT,
  onClick: noop
}

export {DIRECTIONS}
export default DirectionButton
