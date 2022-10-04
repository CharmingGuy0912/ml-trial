import {notEmpty} from '../filter-utils'

describe('filter-utils', () => {
  describe('notEmpty', () => {
    it('should return if a string is empty or not', () => {
      expect(notEmpty('')).toBeFalsy()
      expect(notEmpty('not-empty')).toBeTruthy()
    })

    it('should return if a boolean result of a value is true', () => {
      expect(notEmpty(null)).toBeFalsy()
      expect(notEmpty({})).toBeTruthy()
      expect(notEmpty([])).toBeTruthy()
    })
  })
})
