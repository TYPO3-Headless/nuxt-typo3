<template>
  <div class="t3-form-cta">
    <button
      type="reset"
      @click.prevent="$emit('click:reset')"
    >
      {{ i18n.resetButton }}
    </button>
    <button
      type="submit"
      :disabled="state.sending"
      @click.prevent="$emit('click:submit')"
    >
      {{ state.sending ? i18n.sendingLabel : i18n.submitButton }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { T3FormI18n } from '../../../../types'

defineProps<{
  state: { sending: boolean }
  i18n: Pick<T3FormI18n, 'resetButton' | 'sendingLabel' | 'submitButton'>
}>()

defineEmits(['click:submit', 'click:reset'])
</script>
