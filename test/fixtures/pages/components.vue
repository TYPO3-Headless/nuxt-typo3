<template>
  <div>
    <button id="refresh" @click="updateData()">
      refresh
    </button>
    <T3Renderer
      v-if="pageData?.content?.colPos0"
      :content="pageData.content.colPos0"
    />
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useAsyncData } from '#app'
import { useT3Api } from '../../../src/runtime/composables/useT3Api'
const { pageData, getPage } = useT3Api()
const route = useRoute().fullPath

const getData = async () => {
  const { data: t3PageData } = await useAsyncData(() =>
    getPage(route, {
      baseURL: 'http://localhost:9879'
    })
  )

  pageData.value = t3PageData.value
}

const updateData = () => {
  pageData.value.content.colPos0[0] = {
    id: 27,
    type: 'text',
    colPos: 0,
    categories: '',
    appearance: {
      layout: 'default',
      frameClass: 'default',
      spaceBefore: '',
      spaceAfter: ''
    },
    content: {
      header: 'Updated content',
      subheader: '',
      headerLayout: 0,
      headerPosition: '',
      headerLink: '',
      bodytext: ''
    }
  }
}

await getData()
</script>
