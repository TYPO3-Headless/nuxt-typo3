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
import CeMenu_sitemap from '~typo3/components/content/elements/CeMenu_sitemap.vue'
import CeMenu_pages from '~typo3/components/content/elements/CeMenu_pages.vue'
import CeMenu_abstract from '~typo3/components/content/elements/CeMenu_abstract.vue'
import CeMediaFile from '~typo3/components/content/elements/media/File.vue'

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
  CeMenu_sitemap,
  CeMenu_sitemap_pages: CeMenu_sitemap,
  CeMenu_pages,
  CeMenu_subpages: CeMenu_pages,
  CeMenu_related_pages: CeMenu_pages,
  CeMenu_recently_updated: CeMenu_pages,
  CeMenu_section_pages: CeMenu_pages,
  CeMenu_categorized_pages: CeMenu_pages,
  CeMenu_abstract,
  CeMediaFile
}

export default ({ app }) => {
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key])
    app.components[key] = components[key]
  })
}
