import STATUS_CODES from '@/utils/status-codes'

const {default: request, requestText} = jest.requireActual('@/utils/request')

const body = {hello: 'world'}
const response = new Response(JSON.stringify(body), {
  headers: {
    'Content-type': 'application/json'
  },
  status: 200
})

describe('request', () => {
  beforeAll(() => {
    window.fetch = jest.fn(() => Promise.resolve(response))
  })

  beforeEach(() => {
    window.fetch.mockClear()
  })

  it('should parse the response to json', async () => {
    const result = await request('/')
    expect(result).toEqual(body)
  })

  it('should catch errors', async () => {
    const statusText = 'Not Found'
    window.fetch.mockReturnValueOnce(
      Promise.resolve(
        new Response('', {
          headers: {
            'Content-type': 'application/json'
          },
          status: STATUS_CODES.NOT_FOUND,
          statusText
        })
      )
    )
    try {
      await request('/not-found')
    } catch (error) {
      expect(error.response.status).toBe(STATUS_CODES.NOT_FOUND)
      expect(error.response.statusText).toBe(statusText)
    }
  })

  describe('requestText', () => {
    it('should parse the response to text', async () => {
      const text = '<svg viewBox="0 0 0 0"><path d="M0" /></svg>'
      window.fetch.mockReturnValueOnce(
        Promise.resolve(
          new Response(text, {
            headers: {
              'Content-type': 'image/svg+xml'
            },
            status: 200
          })
        )
      )
      const result = await requestText('/text')
      expect(result).toBe(text)
    })

    it('should catch errors', async () => {
      window.fetch.mockReturnValueOnce(
        Promise.resolve({
          status: STATUS_CODES.SUCCESS,
          text: () => Promise.reject(new Error(''))
        })
      )

      const result = await requestText('/')
      expect(result).toEqual(null)
    })
  })
})
