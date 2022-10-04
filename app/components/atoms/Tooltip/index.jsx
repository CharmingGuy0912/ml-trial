import classNames from 'classnames'
import PropTypes from 'prop-types'

import useTooltip from '@/hooks/use-tooltip'

const TOOLTIP_SIZES = {
  MEDIUM: 'medium',
  SMALL: 'small'
}

const TOOLTIP_SIZES_CLASSNAMES = {
  [TOOLTIP_SIZES.MEDIUM]: 'py-1.5 px-3',
  [TOOLTIP_SIZES.SMALL]: 'py-0.5 px-3'
}

const Tooltip = ({children, className, ...props}) => {
  const {attributes, isVisible, setTooltipRefs, styles} = useTooltip({
    verticalOffset: 8
  })

  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <>
      {children}
      {!props.isDisabled && (
        <div
          ref={setTooltipRefs}
          className={classNames(
            'z-10 flex gap-1.5 rounded',
            'bg-black text-white text-base',
            TOOLTIP_SIZES_CLASSNAMES[props.size],
            'motion-safe:transition-opacity',
            {
              'opacity-0': !isVisible,
              'opacity-100': isVisible
            },
            className
          )}
          style={styles.popper}
          {...attributes.popper}
        >
          {props.title}
        </div>
      )}
    </>
  )
  /* eslint-enable */
}

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  size: PropTypes.oneOf(Object.values(TOOLTIP_SIZES)),
  title: PropTypes.node.isRequired
}

Tooltip.defaultProps = {
  className: null,
  isDisabled: false,
  size: TOOLTIP_SIZES.MEDIUM
}

export {TOOLTIP_SIZES}
export default Tooltip
