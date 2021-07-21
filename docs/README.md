# Introduction 

#### TYPO3 module for [Nuxt.js](https://nuxtjs.org) and [TYPO3 headless](https://github.com/TYPO3-Initiatives/headless) provides API handling and frontend rendering.

<p align="center">
  <img align="center" width="500" :src="$withBase('/images/nuxt_typo3.svg')" alt="nuxt-typo3">
</p>
<p align="center">
  <a href="https://npmjs.com/package/nuxt-typo3"><img src="https://img.shields.io/npm/v/nuxt-typo3/latest.svg?style=flat-square" alt="npm downloads"></a>
  <a href="https://npmjs.com/package/nuxt-typo3"><img src="https://img.shields.io/npm/dt/nuxt-typo3.svg?style=flat-square" alt="npm version"></a>
  <a href="https://standardjs.com"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square" alt="standard js"></a>
  <a href="https://www.npmjs.com/package/nuxt-typo3"><img src="https://img.shields.io/npm/l/nuxt-typo3.svg?style=flat-square" alt="License"></a>
</p>  

## Features

✅ Handle dynamic API routes

✅ Frontend layouts

✅ Backend layouts

✅ Multilanguage

✅ Meta tags provided by API

✅ Most of the standard TYPO3 Content Elements (in progress)

✅ SSR Ready

## How it works

To handle dynamic routes provided by an API we use [Unknown Dynamic Nested Routes Pattern](https://nuxtjs.org/guide/routing#unknown-dynamic-nested-routes). (We don't know exactly what pages are defined in the backend).
What this plugin is doing to resolve TYPO3 data is just hook into the Nuxt.js navigation cycle to provide page data for the frontend and the SSR context. 

1. The first call to the API is executed during [nuxtServerInit Action](https://nuxtjs.org/guide/vuex-store#the-nuxtserverinit-action) and is responsible for getting initial data for your application like languages, main navigations etc. This call is executed in SSR context (first hit) and also when the language on the website has been changed - then we want to get the initial data again for the correct language.
2. The second call to the API gets the current page data information. It is executed on first hit and also on each route change. 

On the frontend we have implemeneted some helper components to handle main features of TYPO3 frontend. Read more in [frontend section](https://typo3-initiatives.github.io/nuxt-typo3/frontend/).

## Schema 

This schema shows how the Nuxt.js navigation cycle was changed. 

![Schema](/nuxt-typo3/images/schema.svg)
