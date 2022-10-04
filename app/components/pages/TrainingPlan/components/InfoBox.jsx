import PropTypes from 'prop-types'

const InfoBox = props => {
  const {bgColor, children} = props

  return (
    <div
      className={`pt-[1px] px-1.5 pb-0.5 text-base border-black/[.06] border-solid border-[1px] rounded ${bgColor}`}
    >
      {children}
    </div>
  )
}

InfoBox.propTypes = {
  bgColor: PropTypes.string,
  children: PropTypes.element
}

InfoBox.defaultProps = {
  bgColor: 'bg-none',
  children: <></>
}

export default InfoBox
