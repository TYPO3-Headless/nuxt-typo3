<template>
  <div>
    <t3-renderer :content="content.colPos0" />
  </div>
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
