import { computed } from 'vue'
import type { T3CeBulletsProps } from '../../../module'

export const useT3CeBullets = (props: T3CeBulletsProps) => {
  const listTag = computed(() => {
    return props.bulletsType === 1 ? 'ol' : 'ul'
  })

  const showBaseList = computed(() => {
    return props.bulletsType === 0 || props.bulletsType === 1
  })

  return { listTag, showBaseList }
}
