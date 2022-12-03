/**
 * Get domain host from url
 * e.g. https://en.myservice.com:4000/path returns en.myservice.com
 *
 * @param {String} url
 */
export const getRawHost = (url: string): string | null => {
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
