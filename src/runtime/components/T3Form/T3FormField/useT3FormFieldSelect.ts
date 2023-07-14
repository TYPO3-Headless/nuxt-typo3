import { computed } from 'vue'

export function useT3FormFieldSelect ({ field }: { field: any}) {
  const options = computed(() => {
    const optionsProperty = field.properties?.options ?? {}

    return Object.entries(optionsProperty).map(([key, label]) => {
      return { key, label }
    })
  })

  return { options }
}
