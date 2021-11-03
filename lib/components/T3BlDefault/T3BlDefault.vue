<template>
  <t3-renderer :content="content.colPos0" />
</template>
<script>
export default {
  name: 'T3BlDefault',
  props: {
    /**
     * page contentData
     */
    content: {
      type: Object,
      required: true
    }
  }
}
</script>
