<template functional>
  <div class="ce-bullets">
    <ce-header v-bind="props" />
    <ul
      :is="props.bulletsType === 1 ? 'ol' : 'ul'"
      v-if="props.bulletsType === 0 || props.bulletsType === 1"
    >
      <li v-for="(el, index) in props.bodytext" :key="index">
        {{ el }}
      </li>
    </ul>
    <dl v-else>
      <template v-for="(el, index) in props.bodytext">
        <dt :key="index">
          {{ el[0] }}
        </dt>
        <dd v-if="el[1]" :key="index">
          {{ el[1] }}
        </dd>
      </template>
    </dl>
  </div>
</template>
<script>
import baseCe from '../mixins/baseCe'
export default {
  name: 'CeBullets',
  extends: baseCe,
  props: {
    bodytext: {
      type: Array,
      required: true,
      default: () => []
    },
    bulletsType: {
      type: Number,
      required: false,
      default: 0
    }
  }
}
</script>
