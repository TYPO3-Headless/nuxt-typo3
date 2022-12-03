<template>
  <div>
    <header v-if="navigation">
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
const navigation = computed(() => {
  return initialData.value?.navigation?.[0].children
})
</script>
