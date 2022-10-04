import normalizer from 'jsonapi-normalizer'

import normalize from '../normalize'

const data = [{track: {id: '123', title: 'Foo'}}]
const links = {next: 'link to next resource'}
const meta = {copyright: 'Foo Bar'}
const json = {
  data,
  links,
  meta
}

describe('normalize', () => {
  it('should return the normalized json', () => {
    expect(normalize(json)).toEqual(normalizer(json))
  })

  it('should return the normalized json', () => {
    expect(normalize({links, meta})).toEqual(normalizer(json))
  })

  it('should return the normalized json and add the extracted links', () => {
    const expectedResult = {
      ...normalizer(json),
      links: json.links
    }
    expect(normalize(json, {extractLinks: true})).toEqual(expectedResult)
  })

  it('should return the normalized json and add the extracted meta', () => {
    const expectedResult = {
      ...normalizer(json),
      meta: json.meta
    }
    expect(normalize(json, {extractMeta: true})).toEqual(expectedResult)
  })
})
