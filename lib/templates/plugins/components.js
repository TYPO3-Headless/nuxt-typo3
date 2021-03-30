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
import CeTextpic from '~typo3/components/content/elements/CeTextpic.vue'
import CeTextmedia from '~typo3/components/content/elements/CeTextmedia.vue'
import CeImage from '~typo3/components/content/elements/CeImage.vue'
import CeHeader from '~typo3/components/content/elements/CeHeader.vue'
import CeTable from '~typo3/components/content/elements/CeTable.vue'
import CeBullets from '~typo3/components/content/elements/CeBullets.vue'
import CeHtml from '~typo3/components/content/elements/CeHtml.vue'
import CeShortcut from '~typo3/components/content/elements/CeShortcut.vue'
import CeDiv from '~typo3/components/content/elements/CeDiv.vue'
import CeMenuSitemap from '~typo3/components/content/elements/CeMenuSitemap.vue'
import CeMenuPages from '~typo3/components/content/elements/CeMenuPages.vue'
import CeMenuAbstract from '~typo3/components/content/elements/CeMenuAbstract.vue'
import CeMediaFile from '~typo3/components/content/elements/media/File.vue'
import CeUploads from '~typo3/components/content/elements/CeUploads'

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
  CeTextpic,
  CeTextmedia,
  CeImage,
  CeHeader,
  CeTable,
  CeBullets,
  CeHtml,
  CeShortcut,
  CeDiv,
  CeMenuSitemap,
  CeMenuSitemapPages: CeMenuSitemap,
  CeMenuPages,
  CeMenuSubpages: CeMenuPages,
  CeMenuRelatedPages: CeMenuPages,
  CeMenuRecentlyUpdated: CeMenuPages,
  CeMenuSectionPages: CeMenuPages,
  CeMenuCategorizedPages: CeMenuPages,
  CeMenuAbstract,
  CeMediaFile,
  CeUploads
}

export default () => {
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key])
  })
}
