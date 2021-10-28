import { getDomain, setDomain } from '~typo3/lib/domains'
export default (context, options) => {
  return {
    list: options.domains ? options.domains : [],
    getDomain: () => getDomain(context),
    setDomain: domain => setDomain(context, domain)
  }
}
