
# Contributing

## Information About Contributing to Project

### Create Issues

* If you find something missing or something is wrong in this manual,
  you are welcome to write an [issue](https://github.com/TYPO3-Initiatives/nuxt-typo3/issues/new)
  describing the problem.
* If you can, please try to fix the problem yourself.
* For minor changes, it is not necessary to create an issue first.

### Make changes (create pull requests)

In order to make changes 
1. Fork the repository
2. Install neded dependencies. This step is important to install husky scripts responsible for verifying your code before push
   ```bash
   yarn install
   ```
3. In your forked repository, make your changes in a new git branch:
   ```bash
   git checkout -b my-fix-branch master
   ```
4. Make your changes and add documentation if needed
5. Commit your changes using a descriptive commit message that follows [conventional commits conventions](https://www.conventionalcommits.org/en/v1.0.0/). Adherence to these conventions is necessary because release notes are automatically generated from these messages. 
   * Please include issue number.
   * If your changes includes breaking changes, please [describe it](https://www.conventionalcommits.org/en/v1.0.0/#commit-message-with-description-and-breaking-change-footer).
   * Example:
    ```bash
    git commit -m "fix: eslint issues (#169)"
    ```
6. Push your branch to GitHub:
    ```bash
    git push origin my-fix-branch
    ```
7. In GitHub, send a pull request to nuxt-typo3:develop
8. Thank you 👏
