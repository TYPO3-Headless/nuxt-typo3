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
  const match = url.match(/^(http:\/\/|https:\/\/)?(www[0-9]?.)?([^/:]*).*$/)
  if (
    match != null &&
    match.length > 2 &&
    typeof match[3] === 'string' &&
    match[3].length > 0
  ) {
    return match[3]
  } else {
    return null
  }
}

export { isDynamicRoute, getHostByURL }
