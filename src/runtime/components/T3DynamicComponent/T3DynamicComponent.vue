<script lang="ts" setup>
// Component to render CE based on type
import { computed } from 'vue'
import { useNuxtApp } from '#app'
import { getBackendLayout } from '../../composables/useT3Layout'
import { getComponentName } from '../../composables/utils'
import type { T3CeBase, T3ContentElement } from '../../../types'

interface T3DynamicComponent {
  data: T3ContentElement<T3CeBase>
  type: string
  layout?: boolean
  index?: number
}

const props = withDefaults(defineProps<T3DynamicComponent>(), {
  layout: false,
  index: -1
})

const { vueApp } = useNuxtApp()
const registredComponents = vueApp._context.components

const componentData = props.layout
  ? computed(() => ({
    tag: getBackendLayout(props.type, registredComponents),
    props: {
      content: props.data
    }
  }))
  : computed(() => ({
    tag: getComponentName(props.data.type, registredComponents),
    props: {
      id: props.data.id,
      type: props.data.type,
      appearance: props.data.appearance,
      index: props.index,
      ...props.data.content
    }
  }))

</script>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<template>
  <component :is="componentData.tag" v-bind="componentData.props" />
</template>
