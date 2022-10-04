import classNames from 'classnames'
import PropTypes from 'prop-types'
import {useMemo} from 'react'

import useMemoizedSelector from '@/hooks/use-memoized-selector'
import {selectors} from '@/modules/entities'
import {EVENT_COLORS} from '@/modules/event/results/types'

const Indicator = props => {
  const {type} = useMemoizedSelector(selectors.makeSelectEventEntity, {
    id: props.eventId
  })

  const bgColor = useMemo(() => {
    let lightness = 'medium'
    if (props.isLight) {
      lightness = 'light'
    }
    return `bg-${EVENT_COLORS[type]}-${lightness}`
  }, [type, props.isLight])

  return (
    <div
      className={classNames(
        'max-w-[10px] min-w-[3px] flex-1 rounded-full',
        bgColor
      )}
    />
  )
}

Indicator.propTypes = {
  eventId: PropTypes.string.isRequired,
  isLight: PropTypes.bool
}

Indicator.defaultProps = {
  isLight: false
}

export default Indicator
