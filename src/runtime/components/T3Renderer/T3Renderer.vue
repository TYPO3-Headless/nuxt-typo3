<script lang="ts" setup>
// Component to render content elements loop
import { h } from 'vue'
import type { T3ContentElement, T3CeBaseProps } from '../../../module'
import { useT3DynamicCe, useT3DynamicComponent } from '../../composables/useT3DynamicComponent'

withDefaults(
  defineProps<{
    /**
     * Array of content elements - colPos[x] from contentData
     */
    content?: T3ContentElement<T3CeBaseProps>[];
    /**
     * Control frame component displaying
     */
    frame?: boolean;
  }>(),
  {
    content: () => [],
    frame: true
  }
)

// render standalone component
const renderComponent = (element: T3ContentElement<T3CeBaseProps>, index: number) => {
  const { id, type, appearance, content } = element
  const component = useT3DynamicCe(type)

  return h(component, {
    ...{
      uid: id,
      appearance,
      index
    },
    id: appearance.frameClass === 'none' ? `c${id}` : null,
    ...content
  })
}

// render component with frame wrapper
const renderFrame = (element: T3ContentElement<T3CeBaseProps>, index: number) => {
  const component = useT3DynamicComponent({
    prefix: 'T3',
    type: 'Frame',
    mode: ''
  })
  return h(
    component,
    {
      ...element.appearance,
      id: `c${element.id}`
    },
    {
      default: () => renderComponent(element, index)
    }
  )
}
</script>

<template>
  <component
    :is="frame && component.appearance.frameClass !== 'none' ? renderFrame(component, index) : renderComponent(component, index)"
    v-for="(component, index) in content"
    :key="index"
  />
</template>
