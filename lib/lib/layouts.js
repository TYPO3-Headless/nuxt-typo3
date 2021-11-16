import { pascalCase } from 'scule'
/**
 * Return backend layout component based on API response
 *
 * @param {String} layout Name of backend layout we are looking for
 * @param {Object} components Available components
 */
function getBackendLayout (layout, components) {
  const backendLayout = 'T3BlDefault'
  if (layout && layout.length) {
    const layoutName = pascalCase(layout)

    if (components[`T3Bl${layoutName}`]) {
      // backendLayout names from TYPO3 coming in form of my_backend_layout,
      // by replacing the underscores we make sure the tag is generated as be-my-backend-layout
      return `T3Bl${layoutName}`
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
function getFrontendLayout (layout, layoutList) {
  if (layoutList && typeof layoutList === 'object' && layoutList[layout]) {
    return layoutList[layout]
  }
  return layout || 'default'
}

export { getBackendLayout, getFrontendLayout }
