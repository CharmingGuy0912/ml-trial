// prettier-ignore
const createDelayCallProvider = (delayMock = jest.fn()) =>
  (effect, next) => {
    if (effect.fn.name === 'delayP') {
      return delayMock(...effect.args)
    }
    return next(...effect.args)
  }

// eslint-disable-next-line import/prefer-default-export
export {createDelayCallProvider}
