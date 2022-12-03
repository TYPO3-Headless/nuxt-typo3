<script lang="ts">
// Content element wrapper - Section Frame
// All props are returned from appearance
import { h, PropType } from 'vue'

import type {
  T3CeAppearanceFrameClass,
  T3CeAppearanceSpace,
  T3CeAppearanceInterface
} from '../../../typespes'

export default {
  name: 'T3Frame',
  inheritAttrs: false,
  props: {
    /**
     * Frame main css class
     */
    frameClass: {
      type: String as PropType<T3CeAppearanceFrameClass>,
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
      type: String as PropType<T3CeAppearanceSpace>,
      default: 'default'
    },
    /**
     * Bottom space
     */
    spaceAfter: {
      type: String as PropType<T3CeAppearanceSpace>,
      default: 'default'
    }
  },
  setup (props: T3CeAppearanceInterface, { slots }) {
    return () =>
      h(
        'div',
        {
          class: [
            't3-ce-frame',
            `frame-${props.frameClass}`,
            `layout-${props.layout}`,
            `space-before-${
              props.spaceBefore.length ? props.spaceBefore : 'default'
            }`,
            `space-after-${
              props.spaceAfter.length ? props.spaceAfter : 'default'
            }`
          ]
        },
        {
          default: () => (slots.default ? slots.default() : null)
        }
      )
  }
}

</script>
