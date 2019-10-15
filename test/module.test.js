jest.setTimeout(60000)

const { Nuxt, Builder } = require('nuxt-edge')

const config = require('../example/nuxt.config')
// config.dev = false

let nuxt

describe('basic', () => {
  beforeAll(async () => {
    nuxt = new Nuxt(config)
    await nuxt.ready()
    await new Builder(nuxt).build()
    await nuxt.server.listen(3000, 'localhost')
  })

  afterAll(async () => {
    await nuxt.close()
  })

  test('render', async () => {
    const context = {}
    const { html } = await nuxt.server.renderRoute('/', context)
    expect(html).toContain('page')
  })
})
