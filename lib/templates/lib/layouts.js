/**
 * Return backend layout component based on API response
 *
 * @param {Object} components Available components
 * @param {String} layout Name of backend layout we are looking for
 */
function getBackendLayout(components, layout) {
  const backendLayout = 'default'
  if (layout && layout.length) {
    const layoutNameCamelCase = layout.replace(/_([a-z])/g, g => {
      return g[1].toUpperCase()
    })

    if (
      Object.prototype.hasOwnProperty.call(
        components,
        `Be${layoutNameCamelCase[0].toUpperCase() +
          layoutNameCamelCase.slice(1)}`
      )
    ) {
      // backendLayout names from TYPO3 coming in form of my_backend_layout,
      // by replacing the underscores we make sure the tag is generated as be-my-backend-layout
      return layout.replace(/_/g, '-')
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
