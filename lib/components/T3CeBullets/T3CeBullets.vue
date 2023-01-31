<template>
  <div class="t3-ce-bullets">
    <t3-ce-header v-bind="$props" />
    <ul
      :is="bulletsType === 1 ? 'ol' : 'ul'"
      v-if="bulletsType === 0 || bulletsType === 1"
    >
      <li v-for="(el, index) in bodytext" :key="index">
        {{ el }}
      </li>
    </ul>
    <dl v-else>
      <template v-for="(el, index) in bodytext">
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
import baseCe from '../../mixins/component/baseCe'
export default {
  name: 'T3CeBullets',
  extends: baseCe,
  props: {
    bodytext: {
      type: Array,
      default: () => []
    },
    bulletsType: {
      type: Number,
      default: 0
    }
  }
}
</script>
