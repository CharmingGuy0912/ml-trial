import classNames from 'classnames'
import {ToastContainer as ToastContainerComponent} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ToastContainer = () => (
  <ToastContainerComponent
    autoClose={4000}
    closeButton={false}
    closeOnClick={false}
    draggable
    hideProgressBar
    newestOnTop
    pauseOnFocusLoss={false}
    pauseOnHover={false}
    position="bottom-center"
    theme="colored"
    toastClassName={() =>
      classNames(
        'bg-gradient-to-l bg-gradient-primary text-xl',
        'min-h-[41px] h-fit min-w-[437px] w-fit border border-white rounded',
        'flex justify-center items-center px-2.5 my-1'
      )
    }
    bodyStyle={{alignItems: 'start'}}
  />
)

export default ToastContainer
