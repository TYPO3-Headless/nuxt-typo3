<template>
  <UiQuote v-bind="$props" />
</template>
<script lang="ts" setup>
interface Props {
  withQuestionMarks: boolean
  bodytext: string
  author?: string
  position?: string
}

withDefaults(defineProps<Props>(), {
  withQuestionMarks: false,
  bodytext: '',
  author: '',
  position: ''
})
</script>
