import React, {useContext} from 'react'

const NavigationMenuContext = React.createContext()

const useNavigationMenuContext = () => useContext(NavigationMenuContext)

export {useNavigationMenuContext}
export default NavigationMenuContext
