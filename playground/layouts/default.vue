<template>
  <div>
    {{ currentSiteOptions }}
    <!-- {{ typo3 }} -->
    <header v-if="navigation">
      <NuxtLink :to="localePath('doentexist')">
        does not exist
      </NuxtLink>
      <NuxtLink to="sandbox">
        redirect
      </NuxtLink>
      <NuxtLink to="/pl">
        pl
      </NuxtLink>
      <NuxtLink
        v-for="{ link, title } in navigation"
        :key="link"
        :to="link"
      >
        {{ title }}
      </NuxtLink>
      <NuxtLink to="/customize?test=ddd">
        test
      </NuxtLink>
      <NuxtLink to="/?test=ddd">
        test
      </NuxtLink>
    </header>
    <slot />
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useT3Api } from '~/../src/runtime/composables/useT3Api'
import { useT3Utils } from '~/../src/runtime/composables/useT3Utils'
import { useT3Options } from '#imports'

const { initialData } = useT3Api()
const { localePath } = useT3Utils()
const { currentSiteOptions } = useT3Options()
const navigation = computed(() => {
  return initialData.value?.navigation?.[0].children
})
</script>
