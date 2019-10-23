# Good to know

+ To handle frontend layouts defined in TYPO3 backend (page->appearance) we use [Nuxt.js Layouts](https://nuxtjs.org/guide/views#layouts). 
+ To handle dynamic routes provided by API we use [Unknown Dynamic Nested Routes Pattern]([Unknown Dynamic Nested Routes Pattern](https://nuxtjs.org/guide/routing#unknown-dynamic-nested-routes). 
+ We provided additional support for backend layouts defined in TYPO3. Information about selected layout is returned by API to asyncData.
+ To render content elements we prepared [render component](lib/templates/components/content/CeRenderer.js) which renders dynamic content elements based on type (returned by API)


This is the [Nuxt.js diagram describes view rendering](https://nuxtjs.org/guide/views) filled by nuxt-typo3 components:

![view-scheme](/nuxt-typo3/images/view.png)
