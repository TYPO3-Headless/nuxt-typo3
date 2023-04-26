import { T3Appearance, T3CeBaseProps } from './'

export interface T3ContentElement<T extends T3CeBaseProps> {
  id: number
  type: string
  colPos: number
  categories: string
  appearance: T3Appearance
  content: T
}
