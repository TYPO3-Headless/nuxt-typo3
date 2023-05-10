<template>
  <div>
    <NuxtLoadingIndicator />

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
    </header>
    <slot />
  </div>
</template>
<script setup lang="ts">
const { initialData } = useT3Api()
const { localePath } = useT3Utils()
const navigation = computed(() => {
  return initialData.value?.navigation?.[0].children
})
</script>
