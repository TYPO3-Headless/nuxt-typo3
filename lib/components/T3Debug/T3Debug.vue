<template>
  <div
    class="t3p-debug"
    :style="{ position: 'relative' }"
  >
    <code
      :style="{
        width: '100%',
        border: '2px solid #E53E3E',
        color: '#000',
        display: 'inline-block',
        wordBreak: 'break-word',
        position: 'absolute',
        fontSize: '12px',
        fontFamily:
          'SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace',
        padding: '10px',
        boxSizing: 'border-box',
        top: 0,
        left: 0,
        backgroundColor: '#FED7D7'
      }"
    >
      {{ JSON.stringify($attrs) }}
    </code>
    <slot />
  </div>
</template>

<script>
// you can use debug wrapper to display quickly CE data
export default {
  name: 'T3Debug'
}
</script>
