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
      (links.value[i] as HTMLAnchorElement)?.addEventListener('click', navigate, false)
    }
  }
}

function removeListeners () {
  if (links.value) {
    for (let i = 0; i < links.value.length; i++) {
      (links.value[i] as HTMLAnchorElement).removeEventListener('click', navigate, false)
    }
    links.value = [] as unknown as HTMLCollection
  }
}

function navigate (e: MouseEvent) {
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

function redirect (e: MouseEvent, target: HTMLAnchorElement) {
  const href = target.getAttribute('href')
  const hrefTarget = target.getAttribute('target')
  const isCtrlKeyPressed = e.ctrlKey || e.metaKey
  const openInNewTab = (hrefTarget && hrefTarget === '_blank') || isCtrlKeyPressed
  // If link is local, not set to open in a new tab,
  // and Ctrl (or Cmd) key is not pressed, navigate with router link
  if (href && href[0] === '/' && !openInNewTab) {
    e.preventDefault()
    // Edge case: run this code only if vue router is installed

    // @ts-ignore-next-line
    navigateTo(href)
  }
}
</script>
