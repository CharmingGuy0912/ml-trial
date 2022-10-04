import React, {useContext} from 'react'

const RoutedModalContext = React.createContext()

const useRoutedModalContext = () => useContext(RoutedModalContext)

export {useRoutedModalContext}
export default RoutedModalContext
