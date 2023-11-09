<script lang="ts" setup>
import type { T3CeBaseProps } from '../../../types'
import { useT3CeHeader } from './useT3CeHeader'

const props = withDefaults(defineProps<T3CeBaseProps>(), {
  header: '',
  headerLayout: 0,
  headerPosition: '',
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
    {{ props.headerLink }}
    <component
      :is="`h${headerLevel}`"
      v-if="props.headerLayout >= 0 && props.headerLayout !== 100"
      :class="props.headerPosition"
    >
      <NuxtLink
        v-if="props.headerLink"
        :to="typeof props.headerLink !== 'string' ? props.headerLink.href : props.headerLink"
      >
        {{ props.header }}
      </NuxtLink>
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
