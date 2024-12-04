<script lang="ts">
// Content element wrapper - Section Frame
// All props are returned from appearance
import type { PropType } from 'vue'

import type {
  T3AppearanceFrameClass,
  T3AppearanceSpace
} from '../../../module'

export default {
  name: 'T3Frame',
  props: {
    /**
     * Frame main css class
     */
    frameClass: {
      type: String as PropType<T3AppearanceFrameClass>,
      default: 'default'
    },
    /**
     * Layout name
     */
    layout: {
      type: String as PropType<string>,
      default: 'default'
    },
    /**
     * Top space
     */
    spaceBefore: {
      type: String as PropType<T3AppearanceSpace>,
      default: 'default'
    },
    /**
     * Bottom space
     */
    spaceAfter: {
      type: String as PropType<T3AppearanceSpace>,
      default: 'default'
    }
  }
}
</script>
<template>
  <div
    :class="[
      't3-ce-frame',
      `frame-${frameClass}`,
      `layout-${layout}`,
      `space-before-${ spaceBefore.length ? spaceBefore : 'default'}`,
      `space-after-${ spaceAfter.length ? spaceAfter : 'default' }`
    ]"
  >
    <slot />
  </div>
</template>
