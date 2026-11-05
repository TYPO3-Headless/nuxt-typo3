import type { Listener } from 'listhen'
import { listen } from 'listhen'
import { createApp, createError, eventHandler, getQuery, toNodeListener } from 'h3'
import initialData from './fixtures/api/initialData.json'
import pageData from './fixtures/api/page.json'
import pageDataEn from './fixtures/api/en/page.json'

let listener: Listener

export async function setup () {
  const app = createApp()
    .use(eventHandler((event) => {
      const { type, cHash } = getQuery(event)
      // TYPO3 rejects a cHash that doesn't belong to the requested path.
      if (type === '834' && cHash) {
        throw createError({ statusCode: 404 })
      }
    }))
    .use('/?type=834', eventHandler(() => initialData))
    .use('/en/i18n', eventHandler(() => pageDataEn))
    .use('/', eventHandler(() => pageData))

  listener = await listen(toNodeListener(app), { port: 9876 })
}

export async function teardown () {
  await listener.close()
}
