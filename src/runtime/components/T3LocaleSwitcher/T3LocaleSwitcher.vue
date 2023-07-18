<template>
  <div class="t3-locale-switcher">
    Current locale: {{ currentCode }}
    <NuxtLink
      v-for="{ title, link } in locales"
      :key="title"
      :to="link"
    >
      {{ title }}
    </NuxtLink>
  </div>
</template>
<script setup lang="ts">
import useT3LocaleSwitcher from './useT3LocaleSwitcher'
const { locales, currentCode } = useT3LocaleSwitcher()
</script>
