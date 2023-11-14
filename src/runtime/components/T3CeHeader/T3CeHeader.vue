<script lang="ts" setup>
import type { T3CeBaseProps } from '../../../types'
import T3Link from '../T3Link/T3Link.vue'
import { useT3CeHeader } from './useT3CeHeader'

const props = withDefaults(defineProps<T3CeBaseProps>(), {
  header: '',
  headerLayout: 0,
  headerPosition: '',
  headerLink: () => ({
    additionalAttributes: [],
    class: '',
    href: '',
    linkText: '',
    target: '',
    title: ''
  }),
  subheader: ''
})

const { headerLevel, headerClass } = useT3CeHeader(props)
</script>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<template>
  <div
    v-if="props.header && props.headerLayout !== 100"
    :class="headerClass"
    class="t3-ce-header"
  >
    <component
      :is="`h${headerLevel}`"
      v-if="props.headerLayout >= 0 && props.headerLayout !== 100"
      :class="props.headerPosition"
    >
      <T3Link
        v-if="props.headerLink"
        :link="props.headerLink"
      >
        {{ props.header }}
      </T3Link>
      <template v-else>
        {{ props.header }}
      </template>
    </component>
    <component
      :is="`h${headerLevel + 1}`"
      v-if="props.subheader"
    >
      {{ props.subheader }}
    </component>
  </div>
</template>
