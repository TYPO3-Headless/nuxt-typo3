<template>
  <div>
    <p>api host: {{ api.baseUrl }}</p>
    <p>default locale: {{ i18n.default }}</p>
    <p>
      locales:
      <span v-for="locale in i18n.locales" :key="locale">{{ locale }}</span>
    </p>
    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
import { useT3Options } from '../../../src/runtime/composables/useT3Options'
const { options } = useT3Options()
const { api, i18n } = options
</script>
