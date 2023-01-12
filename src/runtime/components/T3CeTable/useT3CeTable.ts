import { computed } from 'vue'
import type { T3CeTable } from '../../../types'

export type BodyTextType = string[][]

export const useT3CeTable = (props: T3CeTable) => {
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
