import { resolveDynamicComponent } from 'vue'
import { pascalCase } from 'scule'
import type { DefineComponent } from 'vue'
import type { T3BackendLayout, T3CeBaseProps } from '../../module'

interface DynamicComponentParams {
  type?: string
  prefix?: 'T3' | 'T3Ce' | 'T3Bl' | string
  mode?: 'Lazy' | ''
}

export const useT3DynamicComponent = <T>(
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
  const component = resolveDynamicComponent(componentName)

  if (typeof component === 'string') {
    return resolveDynamicComponent(`${prefix}Default`) as DefineComponent<T>
  }

  return component as DefineComponent<T>
}

export const useT3DynamicBl = <T = T3BackendLayout>(type = 'default') => {
  return useT3DynamicComponent<T>({ type, prefix: 'T3Bl', mode: '' })
}

export const useT3DynamicCe = <T extends T3CeBaseProps = T3CeBaseProps>(type = 'default') => {
  return useT3DynamicComponent<T>({ type, prefix: 'T3Ce', mode: '' })
}
