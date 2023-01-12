export interface T3Menu {
  title: string
  link: string
  target: string
  active: number
  current: number
  spacer: number
  hasSubpages: number
  children?: T3Menu[]
}
