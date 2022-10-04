import classNames from 'classnames'
import PropTypes from 'prop-types'

import useTranslation from '@/hooks/use-translation'
import customPropTypes from '@/utils/prop-types'

const PageHeader = props => {
  const title = useTranslation(props.title)

  return (
    <div
      className={classNames(
        'grid grid-cols-3 items-center px-6 py-4 bg-gradient-to-b bg-gradient-silver shadow',
        props.className
      )}
    >
      <div className="flex items-center">
        <h1 className="shrink-0 grow-0 mr-3 font-page-heading text-primary">
          {title}
        </h1>
        {props.leftSlot}
      </div>
      <div className="justify-self-center">{props.centerSlot}</div>
      <div className="justify-self-end">{props.rightSlot}</div>
    </div>
  )
}

PageHeader.propTypes = {
  centerSlot: PropTypes.node,
  className: PropTypes.string,
  leftSlot: PropTypes.node,
  rightSlot: PropTypes.node,
  title: customPropTypes.Translatable.isRequired
}

PageHeader.defaultProps = {
  centerSlot: null,
  className: null,
  leftSlot: null,
  rightSlot: null
}

export default PageHeader
