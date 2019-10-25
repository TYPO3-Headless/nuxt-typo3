/**
 * Return backend layout component based on API response
 *
 * @param {Object} components Available components
 * @param {String} layout Name of backend layout we are looking for
 */
function getBackendLayout(components, layout) {
  const backendLayout = 'default'
  if (layout && layout.length) {
    if (
      Object.prototype.hasOwnProperty.call(
        components,
        `Be${layout[0].toUpperCase()}${layout.slice(1)}`
      )
    ) {
      return layout
    }
  }
  return backendLayout
}

/**
 * Return frontend layout based on TYPO3 Appearance
 *
 * @param {Object} layoutList Available list of layouts
 * @param {String} layout Name of frontend layout
 */
function getFrontendLayout(layout, layoutList) {
  if (layoutList && typeof layoutList === 'object' && layoutList[layout]) {
    return layoutList[layout]
  }
  return layout || 'default'
}

export { getBackendLayout, getFrontendLayout }
