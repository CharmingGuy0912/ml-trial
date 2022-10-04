import {flattenObject, hexToRgb} from '../utils'

describe('Theme', () => {
  describe('utils', () => {
    describe('flattenObject', () => {
      it('should flatten object combining path in key', () => {
        const source = {
          blub: 'some value',
          foo: {
            bar: {
              baz: 'another value'
            }
          },
          xxx: {
            yyy: 'final value'
          }
        }
        const target = {
          blub: 'some value',
          'foo-bar-baz': 'another value',
          'xxx-yyy': 'final value'
        }
        expect(flattenObject(source)).toEqual(target)
      })
    })

    describe('hexToRgb', () => {
      it('should convert a hex color to rgb values', () => {
        expect(hexToRgb('#ff0000')).toBe('255 0 0')
      })
    })
  })
})
