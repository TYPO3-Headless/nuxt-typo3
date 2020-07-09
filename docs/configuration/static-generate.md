# Generate for static files

If you have simple website and if you don't need to use node server then you can generate your page to html files. You can do it by simple configuration of nuxt application. One thin you need to do is tell the nuxt what page should generate


## Setup list of routes to generate manually

edit `nuxt.config.js`:

```js
export default {
  ...
  generate: {
    routes: ['/', '/various-content-elements', '/page', '/test-page'],
  }
  ...
}
```

after that you need to run:

```bash
yarn nuxt generate
```

it will create the dist folder where you can find static files

## Setup list of routes to generate by API
If you don't want to setup routes to generate manually, you can use API. Headless extension provides initialData endpoint which contains navigation. We can use navigation data to setup routes.

edit `nuxt.config.js`:

```js
import axios from 'axios'

export default {
  ...
  generate: {
    async routes() {
      let routes = ['/']
      await axios.get('http://pwa-demo.ddev.site/api?type=834').then((res) =>
        res.data.navigation.length && res.data.navigation[0].children.map((menuItem) => {
          routes.push(menuItem.link)
        })
      )
      return routes
    }
  }
  ...
}
```

after that you need to run:

```bash
yarn nuxt generate
```


it will create the dist folder where you can find static files


::: tip NGINX Config
You can nginx proxy to provide fallback pages [Read more about nginx proxy for nuxt application](https://nuxtjs.org/faq/nginx-proxy#using-nginx-with-generated-pages-and-a-caching-proxy-as-fallback-)
:::
