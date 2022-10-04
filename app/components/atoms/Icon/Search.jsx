import {ReactComponent} from '@material-icons/svg/svg/search/round.svg'

import Icon from './index'

// istanbul ignore next
const SearchIcon = props => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} component={ReactComponent} />
)

export default SearchIcon
