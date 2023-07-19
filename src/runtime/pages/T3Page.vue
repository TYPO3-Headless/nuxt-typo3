<template>
  <NuxtLayout :name="frontendLayout">
    <T3BackendLayout
      v-if="pageData?.content"
      :name="backendLayout"
      :content="pageData.content"
    />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useHead } from "#app"
import { definePageMeta } from "#imports";
import { useT3Page } from "../composables/useT3Page"
const { headData, pageData, backendLayout, frontendLayout } = await useT3Page()
useHead(headData);
definePageMeta({
  layout: false
})
</script>
