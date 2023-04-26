<script lang="ts">
import { h, resolveComponent } from 'vue'
import type { T3CeBaseProps } from '../../../types'

export interface T3CeShortcutInterface {
  shortcut: Array<T3CeBaseProps>
}

const T3CeShortcut = (props: T3CeShortcutInterface) => {
  return h('div', null, [
    h(resolveComponent('T3Renderer'), {
      content: props.shortcut
    })
  ])
}

export default T3CeShortcut
</script>
