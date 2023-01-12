<script lang="ts" setup>
// Component to render content elements loop
import { h, resolveComponent } from 'vue'
import type { T3ContentElement, T3CeBase } from '../../../types'

interface RendererProps {
  /**
   * Array of content elements - colPos[x] from contentData
   */
  content?: T3ContentElement<T3CeBase>[]
  /**
   * Control frame component displaying
   */
  frame?: boolean
}

const props = withDefaults(defineProps<RendererProps>(), {
  content: () => [],
  frame: true
})

// render standalone component
function renderComponent (element: T3ContentElement<T3CeBase>, index: number) {
  return h(resolveComponent('T3DynamicComponent'), {
    data: element,
    type: element.type,
    index,
    id: `c${element.id}`
  })
}

// render component with frame wrapper
function renderFrame (element: T3ContentElement<T3CeBase>, index: number) {
  return h(resolveComponent('T3Frame'),
    {
      ...element.appearance,
      id: `c${element.id}`
    },
    {
      default: () => renderComponent(element, index)
    }
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
