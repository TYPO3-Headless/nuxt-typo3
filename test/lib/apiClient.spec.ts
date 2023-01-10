import { expect, describe, it } from 'vitest'
import { T3ApiClient } from '../../src/runtime/lib/apiClient'

const siteConfig = {
  hostname: 'localhost',
  api: {
    baseUrl: 'https://api.t3pwa.com'
  },
  i18n: {
    default: 'pl',
    locales: ['pl', 'en']
  },
  endpoints: {
    initialData: '?type=834',
    initialDataFallback: '/?type=834'
  }
}

describe('T3ApiClient', () => {
  const client = new T3ApiClient(siteConfig, {
    headers: {
      Authorization: 'Token'
    }
  })

  it('returns raw headers', () => {
    const { headers } = client.getOptions({})
    expect(headers).toEqual({ Authorization: 'Token' })
  })

  it('use internal fetch instance with custom setup', async () => {
    let requestOptions

    await client.$fetch('/', {
      // eslint-disable-next-line require-await
      async onRequest ({ options }) {
        requestOptions = options
      }
    })

    expect(requestOptions).toHaveProperty('baseURL', 'https://api.t3pwa.com')
    expect(requestOptions).toHaveProperty('headers.Authorization', 'Token')
  })
})
