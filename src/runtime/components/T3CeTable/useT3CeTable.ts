import { computed } from 'vue'
import type { T3CeHeaderProps } from '../T3CeHeader/useT3CeHeader'

export type BodyTextType = string[][]
export interface T3CeTableProps extends T3CeHeaderProps {
  tableCaption: string
  tableHeaderPosition: number
  tableClass: string
  tableTfoot: string
  bodytext: BodyTextType
}

export default function (props: T3CeTableProps) {
  const thead = computed((): string[] => {
    return (
      (props.tableHeaderPosition === 1 &&
        [...(props.bodytext as BodyTextType)].shift()) ||
      []
    )
  })

  const tbody = computed((): string[][] => {
    const tbody = [...(props.bodytext as BodyTextType)]
    if (thead?.value?.length) {
      tbody.shift()
    }
    if (tfoot?.value?.length) {
      tbody.pop()
    }
    return tbody
  })

  const tfoot = computed((): string[] => {
    return (
      (props.tableTfoot === '1' &&
        [...(props.bodytext as BodyTextType)].pop()) ||
      []
    )
  })

  return { thead, tbody, tfoot }
}
