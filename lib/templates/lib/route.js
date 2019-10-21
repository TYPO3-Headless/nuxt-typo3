/**
 * Check if passed route is dynamic
 *
 * @param {String} route
 * @returns {Boolean}
 */
function isDynamicRoute(route) {
  return route.matched[0].path.includes('*')
}

export { isDynamicRoute }
