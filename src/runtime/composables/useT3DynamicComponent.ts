import { resolveComponent } from 'vue'
import { pascalCase } from 'scule'
import type { ConcreteComponent } from 'vue'
import { T3BackendLayout, T3CeBase, T3ContentElement } from '../../types'

interface DynamicComponentParams {
  type?: string
  prefix?: 'T3' | 'T3Ce' | 'T3Bl' | string
  mode?: 'Lazy' | ''
}

export const useT3DynamicComponent = (
  {
    type,
    prefix,
    mode
  }: DynamicComponentParams = {
    type: 'Default',
    prefix: 'T3Ce',
    mode: 'Lazy'
  }
) => {
  const componentName =
    (mode || 'Lazy') + (prefix || 'T3Ce') + pascalCase(type || 'default')
  const component = resolveComponent(componentName)

  return typeof component === 'string'
    ? resolveComponent(`${prefix}Default`)
    : component
}

export const useT3DynamicBl = (type: string) => {
  return useT3DynamicComponent({ type, prefix: 'T3Bl', mode: '' }) as ConcreteComponent<T3BackendLayout>
}

export const useT3DynamicCe = <T extends T3CeBase = any>(type: string) => {
  return useT3DynamicComponent({ type, prefix: 'T3Ce', mode: '' }) as ConcreteComponent<T3ContentElement<T>>
}
