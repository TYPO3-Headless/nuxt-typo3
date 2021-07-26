# 1. Provide API

::: warning
The API, which consumes the frontend, is provided by the backend application. This documentation, however, does not
cover the steps how to setup the backend app, but simply provides a quick overview of the very basic steps to setup
a backend application.

To learn more about setting up the API with TYPO3, please refer to the [TYPO3 headless](https://github.com/TYPO3-Initiatives/headless)
extension repository.
:::

In order to provide a `headless API`, you need to setup a TYPO3 project that is configured around the [TYPO3 headless](https://github.com/TYPO3-Initiatives/headless) extension. The essential steps are:

1. Install TYPO3 v9.5 or higher (preferably using composer)
2. Install and activate the `headless` extension, e.g. using composer:

```bash
composer require friendsoftypo3/headless
```

3. Create a new root page in the TYPO3 page tree, along with a new site configuration, and assign it a new TypoScript root template that includes the `headless` template. (Keep in mind that it conflicts with `fluid_styled_content`, which must therefore be deactivated.)

For a detailed introduction to `TYPO3 headless` please consult the [TYPO3 headless](https://github.com/TYPO3-Initiatives/headless) repository.