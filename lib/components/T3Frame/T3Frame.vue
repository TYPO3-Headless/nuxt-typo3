<template>
  <div
    class="t3-ce-frame"
    :class="computedClasses"
  >
    <slot />
  </div>
</template>

<!-- Content element wrapper - Section Frame
All props are returned from appearance -->
<script>
export default {
  name: 'T3Frame',
  props: {
    frameClass: {
      type: String,
      default: ''
    },
    layout: {
      type: String,
      default: 'default'
    },
    spaceAfter: {
      type: String,
      default: 'default'
    },
    spaceBefore: {
      type: String,
      default: 'default'
    }
  },
  computed: {
    computedClasses () {
      return [
          `frame-${this.frameClass}`,
          `layout-${this.layout}`,
          `space-before-${
            this.spaceBefore.length ? this.spaceBefore : 'default'
          }`,
          `space-after-${
            this.spaceAfter.length ? this.spaceAfter : 'default'
          }`
      ]
    }
  }
}
</script>
