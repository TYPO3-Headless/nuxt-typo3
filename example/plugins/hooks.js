export default ({ app }) => {
  app.$typo3.hook('beforeRedirect', (context, data) => {
    data.redirectUrl = '/'
    return data
  })
}
