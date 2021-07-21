# Before you start

This guide is explains how to build your headless/PWA TYPO3 application from scratch. The process includes some steps to achieve this:

1. Provide the TYPO3 headless API. 
2. Bootstrap Nuxt.js application with required modules. 
3. Provide your frontend.

## What do you need ? 

It is important to understand that there are two separate applications involved in order to build a headless/PWA TYPO3 application, a backend application and a frontend application:
1. The first application – the backend – is a TYPO3 project which incorporates as its main building block the [`TYPO3 headless` extension](https://github.com/TYPO3-Initiatives/headless). It eventually provides the `headless API`, which will be consumed by the frontend.
2. The second application – the frontend – is based on Nuxt.js and Node.js. All the requirements needed to build the frontend are gathered in this repository, the `nuxt-typo3` package. Be aware that due to the nature of [SSR](https://v3.vuejs.org/guide/ssr/introduction.html#what-is-server-side-rendering-ssr), upon which Nuxt.js is built, the frontend application itself consists of a server and a client app.

### Backend

+ TYPO3 - minimum required version is `9.5`

### Frontend 

+ Node.js - minimum required version is `8.9.0`
+ npm/yarn
