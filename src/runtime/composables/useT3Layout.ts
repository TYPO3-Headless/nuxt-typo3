import { pascalCase } from 'scule'

/**
 * Return backend layout component based on API response
 *
 * @param {String} layout Name of backend layout we are looking for
 * @param {Object} components Available components
 */
export function getBackendLayout (layout: string, components: object): string {
  if (layout?.length) {
    // backendLayout names from TYPO3 coming in form of my_backend_layout
    // we need to transform it to MyBackendLayout
    const layoutName = `T3Bl${pascalCase(layout)}`
    if (Object.prototype.hasOwnProperty.call(components, layoutName)) {
      return layoutName
    }
  }
  return 'T3BlDefault'
}

/**
 * Return frontend layout based on TYPO3 Appearance
 *
 * @param {String} layout Name of frontend layout
 * @param {Object} layoutList Available list of layouts
 */
export function getFrontendLayout (layout: string, layoutList: object): string {
  return layoutList?.[layout] ?? 'default'
}
