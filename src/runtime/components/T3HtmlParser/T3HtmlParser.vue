<template>
  <!-- /* eslint-disable @typescript-eslint/no-unused-vars */ -->
  <!-- eslint-disable vue/no-v-html -->
  <div
    ref="htmlparser"
    class="t3-ce-rte"
    v-html="content"
  />
</template>

<script lang="ts" setup>
import { navigateTo, nextTick, ref, onMounted, onBeforeUnmount } from '#imports'

const links = ref<HTMLCollection>()

defineProps<{
  content: string
}>()

onMounted(() => {
  nextTick(addListeners)
})

onBeforeUnmount(() => {
  removeListeners()
})

const htmlparser = ref<HTMLDivElement>()
function addListeners () {
  links.value = htmlparser.value?.getElementsByTagName('a')
  if (links.value) {
    for (let i = 0; i < links.value.length; i++) {
      links.value[i]?.addEventListener('click', navigate, false)
    }
  }
}

function removeListeners () {
  if (links.value) {
    for (let i = 0; i < links.value.length; i++) {
      links.value[i].removeEventListener('click', navigate, false)
    }
    links.value = [] as unknown as HTMLCollection
  }
}

function navigate (e: Event) {
  let target = e.target as HTMLElement
  let i = 0
  // Go throught 5 parents max to find a tag
  while (
    i < 5 &&
    !(target instanceof HTMLAnchorElement) &&
    target &&
    target.parentNode
  ) {
    target = target.parentNode as HTMLElement
    i++
  }
  // If target is still not a link, ignore
  if (!(target instanceof HTMLAnchorElement)) { return }
  return redirect(e, target)
}

function redirect (e: Event, target: HTMLAnchorElement) {
  const href = target.getAttribute('href')
  // Get link target, if local link navigateTo
  if (href && href[0] === '/') {
    e.preventDefault()
    // Edge case: run this code only if vue router is installed

    // @ts-ignore-next-line
    navigateTo(href)
  }
}
</script>
