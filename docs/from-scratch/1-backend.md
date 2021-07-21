# 1. Provide API

In order to provide a `headless API`, you need to setup a TYPO3 project that is configured around the [TYPO3 headless](https://github.com/TYPO3-Initiatives/headless) extension. The essential steps are:

1. Install TYPO3 v9.5 or higher (preferably using composer)
2. Install the `headless` extension, e.g. using composer:

```bash
composer require friendsoftypo3/headless
```

3. Create a new root page in the TYPO3 page tree, along with a new site configuration, and assign it a new TypoScript root template that includes the `headless` template. (Keep in mind that it conflicts with `fluid_styled_content`.)

For a detailed introduction into `TYPO3 headless` please consult the [TYPO3 headless](https://github.com/TYPO3-Initiatives/headless) repository.
