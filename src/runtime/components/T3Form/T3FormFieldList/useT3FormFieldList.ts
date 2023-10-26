import { resolveDynamicComponent, inject } from 'vue'
import type { VNodeTypes } from 'vue'
import { pascalCase } from 'scule'
import type { T3FormElement, T3FormFieldListProps } from '../../../../types'
import { T3FormCustomComponentsKey } from '../useT3Form'

export function useT3FormFieldList (props: T3FormFieldListProps) {
  const customComponents = inject(
    T3FormCustomComponentsKey,
    props.customComponents ?? {}
  )

  const getComponentByName = (name: string | undefined): VNodeTypes | undefined => {
    if (!name) {
      return undefined
    }

    if (name in customComponents) {
      return customComponents[name as keyof typeof customComponents]
    }

    const resolvedComponent = resolveDynamicComponent('T3FormField' + pascalCase(name))
    return typeof resolvedComponent !== 'string'
      ? resolvedComponent
      : undefined
  }

  const resolveFieldComponent = (field: T3FormElement) => {
    return getComponentByName(field.identifier) ?? getComponentByName(field.type) ?? 'T3FormField'
  }

  return { resolveFieldComponent }
}
