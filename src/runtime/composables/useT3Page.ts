import { useT3Api } from './useT3Api'
import { useT3Meta } from './useT3Meta'
import { useT3DynamicBl } from './useT3DynamicComponent'

export const useT3Page = () => {
  const { pageData } = useT3Api()
  const { getMeta } = useT3Meta()
  const T3BackendLayout = useT3DynamicBl(pageData.value.appearance.backendLayout)

  return {
    pageData,
    metaData: getMeta,
    T3BackendLayout
  }
}
