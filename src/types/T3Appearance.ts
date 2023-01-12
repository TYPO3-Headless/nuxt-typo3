export type T3AppearanceSpace =
  | 'default'
  | 'extra-small'
  | 'small'
  | 'medium'
  | 'large'
  | 'extra-large'
  | string

export type T3AppearanceFrameClass =
  | 'default'
  | 'ruler-before'
  | 'ruler-after'
  | 'indent'
  | 'indent-left'
  | 'indent-right'
  | 'none'
  | string

export interface T3Appearance {
  frameClass: T3AppearanceFrameClass
  layout: string
  spaceAfter: T3AppearanceSpace
  spaceBefore: T3AppearanceSpace
  background?: string
}
