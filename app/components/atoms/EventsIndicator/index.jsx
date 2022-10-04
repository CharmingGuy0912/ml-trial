import classNames from 'classnames'
import PropTypes from 'prop-types'

import Indicator from './Indicator'

const EventsIndicator = props => (
  <div
    className={classNames(
      'flex justify-center h-[3px] gap-[3px] px-px overflow-hidden',
      props.className
    )}
  >
    {props.eventIds.map(eventId => (
      <Indicator key={eventId} eventId={eventId} isLight={props.isLight} />
    ))}
  </div>
)

EventsIndicator.propTypes = {
  className: PropTypes.string,
  eventIds: PropTypes.arrayOf(PropTypes.string),
  isLight: PropTypes.bool
}

EventsIndicator.defaultProps = {
  className: null,
  eventIds: [],
  isLight: false
}

export default EventsIndicator
