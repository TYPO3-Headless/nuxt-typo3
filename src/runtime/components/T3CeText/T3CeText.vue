<template>
  <div class="t3-ce-text">
    <T3CeHeader v-bind="props" />
    <T3HtmlParser :content="props.bodytext" />
  </div>
</template>

<script setup lang="ts">
import type { T3CeHeaderProps } from '../T3CeHeader/useT3CeHeader'

const props = withDefaults(defineProps<T3CeHeaderProps>(), {
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
  subheader: '',
  bodytext: ''
})
</script>
