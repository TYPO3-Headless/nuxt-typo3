import type { T3File } from './'

export interface T3Gallery {
  position: {
    horizontal: string
    vertical: string
    noWrap: boolean
  }
  width: number;
  count: {
    files: number
    columns: number
    rows: number
  }
  columnSpacing: number;
  border: {
    enabled: boolean
    width: number
    padding: number
  }
  rows: {
    [key: string]: {
      columns: Record<string, T3File>
    }
  }
}
