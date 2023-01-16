<script lang="ts" setup>
// Component to render content elements loop
import { ConcreteComponent, h } from 'vue'
import type { T3ContentElement, T3CeBase } from '../../../types'
import { useT3DynamicCe, useT3DynamicComponent } from '../../composables/useT3DynamicComponent'
const props = withDefaults(
  defineProps<{
    /**
     * Array of content elements - colPos[x] from contentData
     */
    content?: T3ContentElement<T3CeBase>[];
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
const renderComponent = (element: T3ContentElement<T3CeBase>, index: number) => {
  const component = useT3DynamicCe(element.type) as ConcreteComponent
  return h(component, {
    element,
    index,
    id: `c${element.id}`,
    ...element.content
  })
}

// render component with frame wrapper
const renderFrame = (element: T3ContentElement<T3CeBase>, index: number) => {
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
    () => renderComponent(element, index)
  )
}

// render loop of content elements
const T3Renderer = () => {
  return props.content.map((element, index: number) => {
    return props.frame && element.appearance.frameClass !== 'none'
      ? renderFrame(element, index)
      : renderComponent(element, index)
  })
}
</script>

<template>
  <T3Renderer />
</template>
