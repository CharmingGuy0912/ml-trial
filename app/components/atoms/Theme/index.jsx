import mapValues from 'lodash/mapValues'
import {useMemo} from 'react'

import * as themes from './themes'
import {flattenObject, hexToRgb} from './utils'

const Theme = () => {
  const css = useMemo(() => {
    const cssVariables = {
      ...themes.standard,
      colors: mapValues(flattenObject(themes.standard.colors, '-'), hexToRgb)
    }

    return Object.entries(flattenObject(cssVariables, '-'))
      .map(([key, value]) => `--${key}: ${value};`)
      .join('\n')
  }, [])

  return (
    <style>
      {`:root {
        ${css}
      }`}
      {`::-webkit-scrollbar {
          width: 4px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0);
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.5);
        }`}
    </style>
  )
}

export default Theme
