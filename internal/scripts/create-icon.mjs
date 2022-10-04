import fs from 'fs'
import startCase from 'lodash/startCase.js'
import camelCase from 'lodash/camelCase.js'

const name = process.argv[2]
const namePascal = startCase(camelCase(name)).replace(/ /g, '')
const svgPath = `node_modules/@material-icons/svg/svg/${name}/round.svg`
const componentPath = `app/components/atoms/Icon/${namePascal}.jsx`

if(fs.existsSync(svgPath)){
  fs.writeFileSync(
    componentPath,
`import {ReactComponent} from '@material-icons/svg/svg/${name}/round.svg'

import Icon from './index'

// istanbul ignore next
const ${namePascal}Icon = props => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} component={ReactComponent} />
)

export default ${namePascal}Icon
`
  )
  console.log('\x1b[32m%s\x1b[0m', `Icon file created: ${componentPath}`)
} else {
  console.error('\x1b[31m%s\x1b[0m', `Svg file not found: ${svgPath}`)
}
