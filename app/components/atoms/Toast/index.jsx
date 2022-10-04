import {TOAST_VARIANTS} from './components/constants'
import error from './components/error'
import success from './components/success'

const toast = ({variant, ...props}) => {
  switch (variant) {
    case TOAST_VARIANTS.ERROR:
      return () => error(props)
    case TOAST_VARIANTS.SUCCESS:
      return () => success(props)
    default:
      return null
  }
}

export default toast
