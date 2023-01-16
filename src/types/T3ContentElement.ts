import { T3CeBase, T3Appearance } from './'

export interface T3ContentElement<T extends T3CeBase> {
  id: number
  type: string
  colPos: number
  categories: string
  appearance: T3Appearance
  content: T
}
