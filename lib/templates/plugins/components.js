import Vue from 'vue'
import HtmlParser from '~typo3/components/utilities/HtmlParser.vue'
import LangSwitcher from '~typo3/components/utilities/LangSwitcher.vue'
import NavLink from '~typo3/components/utilities/NavLink.vue'
import CeDebug from '~typo3/components/content/CeDebug'
import CeDynamic from '~typo3/components/content/CeDynamic'
import CeFrame from '~typo3/components/content/CeFrame'
import CeRenderer from '~typo3/components/content/CeRenderer'
import CeDefault from '~typo3/components/content/elements/CeDefault'
import CeText from '~typo3/components/content/elements/CeText.vue'
import CeHeader from '~typo3/components/content/elements/CeHeader.vue'
import CeMenu_sitemap from '~typo3/components/content/elements/CeMenu_sitemap.vue'

const components = {
  HtmlParser,
  LangSwitcher,
  NavLink,
  CeDebug,
  CeDefault,
  CeDynamic,
  CeFrame,
  CeRenderer,
  CeText,
  CeHeader,
  CeMenu_sitemap
}

export default ({ app }) => {
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key])
    app.components[key] = components[key]
  })
}
