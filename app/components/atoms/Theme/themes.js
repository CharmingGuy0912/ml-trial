/* eslint-disable sort-keys */
const baseColors = {
  white: '#FFFFFF',
  silver: '#F3F5F6',
  gray: {
    light: '#E5E7E7',
    medium: '#BBBBBB',
    dark: '#212121'
  },
  red: {
    light: '#F8CED9',
    medium: '#DB0A40'
  },
  orange: {
    light: '#FCEACE',
    medium: '#F2940A'
  },
  yellow: {
    light: '#FCF6D0',
    medium: '#F2D014'
  },
  green: {
    light: '#E5F0DF',
    medium: '#7CB45E'
  },
  emerald: {
    light: '#D6E7DF',
    medium: '#32885F'
  },
  blue: {
    light: '#CEE7F5',
    medium: '#0a86cb',
    dark: '#0a3064'
  }
}

const standard = {
  colors: {
    ...baseColors,
    accent: baseColors.red.medium,
    backdrop: '#081D39',
    border: baseColors.gray.dark,
    primary: baseColors.blue.dark,
    background: baseColors.silver,
    divider: baseColors.gray.medium,
    surface: baseColors.white
  }
}

export {
  // eslint-disable-next-line import/prefer-default-export
  standard
}
