import { T3CeBase } from '../'

export interface T3CeTable extends T3CeBase {
  tableCaption: string
  tableHeaderPosition: number
  tableClass: string
  tableTfoot: string
  bodytext: string[][]
}
