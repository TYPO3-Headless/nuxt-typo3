// GitLab Pages redirects /introduction to /introduction/ because a directory with
// that name exists next to introduction.html (autoSubfolderIndex: false).
// Content paths have no trailing slash, so strip it before the page resolves.
export default defineNuxtRouteMiddleware((to) => {
  if (to.path !== '/' && to.path.endsWith('/')) {
    return navigateTo({ path: to.path.replace(/\/+$/, ''), query: to.query, hash: to.hash }, { replace: true })
  }
})
