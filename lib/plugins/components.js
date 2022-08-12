import Vue from 'vue'
import T3BlDefault from '~typo3/components/T3BlDefault'
import T3HtmlParser from '~typo3/components/T3HtmlParser'
import T3LangSwitcher from '~typo3/components/T3LangSwitcher'
import T3NavLink from '~typo3/components/T3NavLink'
import T3CeDebug from '~typo3/components/T3Debug'
import T3Dynamic from '~typo3/components/T3Dynamic'
import T3Frame from '~typo3/components/T3Frame'
import T3Renderer from '~typo3/components/T3Renderer'
import T3CeDefault from '~typo3/components/T3CeDefault'
import T3CeText from '~typo3/components/T3CeText'
import T3CeTextpic from '~typo3/components/T3CeTextpic'
import T3CeTextmedia from '~typo3/components/T3CeTextmedia'
import T3CeImage from '~typo3/components/T3CeImage'
import T3CeHeader from '~typo3/components/T3CeHeader'
import T3CeTable from '~typo3/components/T3CeTable'
import T3CeBullets from '~typo3/components/T3CeBullets'
import T3CeHtml from '~typo3/components/T3CeHtml'
import T3CeShortcut from '~typo3/components/T3CeShortcut'
import T3CeDiv from '~typo3/components/T3CeDiv'
import T3CeMenuSitemap from '~typo3/components/T3CeMenuSitemap'
import T3CeMenuSitemapPages from '~typo3/components/T3CeMenuSitemapPages'
import T3CeMenuPages from '~typo3/components/T3CeMenuPages'
import T3CeMenuSubpages from '~typo3/components/T3CeMenuSubpages'
import T3CeMenuRelatedPages from '~typo3/components/T3CeMenuRelatedPages'
import T3CeMenuRecentlyUpdated from '~typo3/components/T3CeMenuRecentlyUpdated'
import T3CeMenuSectionPages from '~typo3/components/T3CeMenuSectionPages'
import T3CeMenuCategorizedPages from '~typo3/components/T3CeMenuCategorizedPages'
import T3CeMenuAbstract from '~typo3/components/T3CeMenuAbstract'
import T3MediaFile from '~typo3/components/T3MediaFile'
import T3CeUploads from '~typo3/components/T3CeUploads'

const components = {
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
  T3CeMenuSitemap,
  T3CeMenuSitemapPages,
  T3CeMenuPages,
  T3CeMenuSubpages,
  T3CeMenuRelatedPages,
  T3CeMenuRecentlyUpdated,
  T3CeMenuSectionPages,
  T3CeMenuCategorizedPages,
  T3CeMenuAbstract,
  T3CeUploads,
  T3MediaFile
}

Object.keys(components).forEach((key) => {
  Vue.component(key, components[key])
})
