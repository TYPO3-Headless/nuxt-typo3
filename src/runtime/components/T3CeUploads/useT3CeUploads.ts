import { useT3Options } from '../../composables/useT3Options'

export const useT3CeUploads = () => {
  const { currentSiteOptions } = useT3Options()
  const baseUrl = currentSiteOptions.value?.api.baseUrl
  const getExtensionImg = (extension: string) => {
    return `${baseUrl}/typo3/sysext/frontend/Resources/Public/Icons/FileIcons/${extension}.gif`
  }

  const onError = (event: Event) => {
    const element = event.target as HTMLImageElement
    element.src = getExtensionImg('default')
  }

  return { getExtensionImg, onError }
}
