import Vue from 'vue'
import T3BlDefault from '~typo3/components/T3BlDefault'
import T3HtmlParser from '~typo3/components/T3HtmlParser/T3HtmlParser.vue'
import T3LangSwitcher from '~typo3/components/T3LangSwitcher/T3LangSwitcher.vue'
import T3NavLink from '~typo3/components/T3NavLink/T3NavLink.vue'
import T3CeDebug from '~typo3/components/T3Debug/T3Debug.vue'
import T3Dynamic from '~typo3/components/T3Dynamic/T3Dynamic.js'
import T3Frame from '~typo3/components/T3Frame/T3Frame.js'
import T3Renderer from '~typo3/components/T3Renderer/T3Renderer.js'
import T3CeDefault from '~typo3/components/T3CeDefault'
import T3CeText from '~typo3/components/T3CeText/T3CeText.vue'
import T3CeTextpic from '~typo3/components/T3CeTextpic/T3CeTextpic.vue'
import T3CeTextmedia from '~typo3/components/T3CeTextmedia/T3CeTextmedia.vue'
import T3CeImage from '~typo3/components/T3CeImage/T3CeImage.vue'
import T3CeHeader from '~typo3/components/T3CeHeader'
import T3CeTable from '~typo3/components/T3CeTable/T3CeTable.vue'
import T3CeBullets from '~typo3/components/T3CeBullets'
import T3CeHtml from '~typo3/components/T3CeHtml/T3CeHtml.vue'
import T3CeShortcut from '~typo3/components/T3CeShortcut/T3CeShortcut.vue'
import T3CeDiv from '~typo3/components/T3CeDiv'
import T3CeMenuPages from '~typo3/components/T3CeMenuPages/T3CeMenuPages.vue'
import T3CeMenuAbstract from '~typo3/components/T3CeMenuAbstract/T3CeMenuAbstract.vue'
import T3MediaFile from '~typo3/components/T3MediaFile/T3MediaFile.vue'
import T3CeUploads from '~typo3/components/T3CeUploads/T3CeUploads.vue'
import T3CeFeloginLogin from '~typo3/components/T3CeFeloginLogin'

const components = {
  T3CeFeloginLogin,
  T3BlDefault,
  T3HtmlParser,
  T3LangSwitcher,
  T3NavLink,
  T3CeDebug,
  T3CeDefault,
  T3Dynamic,
  T3Frame,
  T3Renderer,
  T3CeText,
  T3CeTextpic,
  T3CeTextmedia,
  T3CeImage,
  T3CeHeader,
  T3CeTable,
  T3CeBullets,
  T3CeHtml,
  T3CeShortcut,
  T3CeDiv,
  T3CeMenuSitemap: T3CeMenuPages,
  T3CeMenuSitemapPages: T3CeMenuPages,
  T3CeMenuPages,
  T3CeMenuSubpages: T3CeMenuPages,
  T3CeMenuRelatedPages: T3CeMenuPages,
  T3CeMenuRecentlyUpdated: T3CeMenuPages,
  T3CeMenuSectionPages: T3CeMenuPages,
  T3CeMenuCategorizedPages: T3CeMenuPages,
  T3CeMenuAbstract,
  T3CeUploads,
  T3MediaFile
}

Object.keys(components).forEach((key) => {
  Vue.component(key, components[key])
})
