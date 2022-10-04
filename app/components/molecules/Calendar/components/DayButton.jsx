import classNames from 'classnames'
import PropTypes from 'prop-types'
import {forwardRef, memo} from 'react'
import {useDayPicker} from 'react-day-picker'

import EventsIndicator from '@/components/atoms/EventsIndicator'

const DayButton = forwardRef(
  ({activeModifiers, children, ...props}, ref) => {
    const {mode} = useDayPicker()

    return (
      <button
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        ref={ref}
        className={classNames('w-full h-8 transition duration-200', {
          /* eslint-disable sort-keys */
          'text-gray-medium': activeModifiers.outside,
          'font-bold': activeModifiers.today,
          'specific:text-white specific:bg-primary': activeModifiers.selected,
          'bg-gray-light': activeModifiers.hover,
          'bg-silver': activeModifiers.hover_range,
          'rounded-l':
            activeModifiers.range_start || activeModifiers.hover_range_start,
          'rounded-r':
            activeModifiers.range_end || activeModifiers.hover_range_end,
          'rounded hover:bg-gray-light': mode === 'single'
          /* eslint-enable sort-keys */
        })}
      >
        {children}

        <EventsIndicator
          className="mt-px w-[38px]"
          isLight={activeModifiers.outside}
        />
      </button>
    )
  }
)

DayButton.displayName = 'DayButton'

DayButton.propTypes = {
  activeModifiers: PropTypes.shape({
    /* eslint-disable camelcase */
    hover: PropTypes.bool,
    hover_range: PropTypes.bool,
    hover_range_end: PropTypes.bool,
    hover_range_start: PropTypes.bool,
    outside: PropTypes.bool,
    range_end: PropTypes.bool,
    range_start: PropTypes.bool,
    selected: PropTypes.bool,
    today: PropTypes.bool
    /* eslint-enable camelcase */
  }),
  children: PropTypes.node,
  date: PropTypes.instanceOf(Date).isRequired
}

DayButton.defaultProps = {
  activeModifiers: {},
  children: null
}

export default memo(DayButton)
