/**
 * Check if passed route is dynamic
 *
 * @param {String} route
 * @returns {Boolean}
 */
function isDynamicRoute (route) {
  if (
    route === undefined ||
    route.matched === undefined ||
    route.matched[0] === undefined
  ) {
    return false
  } else {
    return route.matched[0].path.includes('*')
  }
}

/**
 * Get domain host from url
 * e.g. https://en.myservice.com:4000/path returns en.myservice.com
 *
 * @param {String} url
 */
function getHostByURL (url) {
  const match = url.match(/^(http:\/\/|https:\/\/)?([^/:]*).*$/)
  if (
    match != null &&
    match.length > 2 &&
    typeof match[2] === 'string' &&
    match[2].length > 0
  ) {
    return match[2]
  } else {
    return null
  }
}

/**
 * Universal redirect for ssr/browser
 *
 * @param {Object} context - Nuxt context
 * @param {String} redirectUrl
 * @param {Number} statusCode
 * @returns
 */
function redirect ({ redirect, next }, redirectUrl, statusCode = 301) {
  if (process.server) {
    return redirect(
      statusCode,
      redirectUrl
    )
  } else if (process.client && typeof window !== 'undefined') {
    window.location.href = redirectUrl
    return next(false)
  }
}

export { isDynamicRoute, getHostByURL, redirect }
