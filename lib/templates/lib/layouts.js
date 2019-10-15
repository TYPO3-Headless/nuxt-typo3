/**
 * Return backend layout component based on API response
 *
 * @param {Object} components Available components
 * @param {String} layout Name of backend layout we are looking for
 */
function getBackendLayout(components, layout) {
  const backendLayout = 'default'
  if (layout && layout.length && layout.includes('pagets__')) {
    const _backendLayout = layout.split('pagets__').pop()
    if (
      Object.prototype.hasOwnProperty.call(
        components,
        `Be${_backendLayout[0].toUpperCase() + _backendLayout.slice(1)}`
      )
    ) {
      return _backendLayout
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
function getFrontendLayout(layoutList, layout) {
  return layoutList[layout] || 'default'
}

export { getBackendLayout, getFrontendLayout }
