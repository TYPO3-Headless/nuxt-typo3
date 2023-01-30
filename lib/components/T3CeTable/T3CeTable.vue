<template>
  <div :class="`t3-ce-table--${tableClass}`" class="t3-ce-table">
    <t3-ce-header v-bind="$props" />
    <table>
      <caption v-if="tableCaption">
        {{
          tableCaption
        }}
      </caption>
      <thead v-if="thead">
        <tr>
          <th v-for="(col, colKey) in thead" :key="colKey">
            {{ col }}
          </th>
        </tr>
      </thead>
      <tbody v-if="tbody">
        <tr v-for="(row, rowKey) in tbody" :key="rowKey">
          <td
            :is="tableHeaderPosition === 2 && colKey === 0 ? 'th' : 'td'"
            v-for="(col, colKey) in row"
            :key="colKey"
          >
            {{ col }}
          </td>
        </tr>
      </tbody>
      <tfoot v-if="tfoot">
        <tr>
          <td v-for="(col, colKey) in tfoot" :key="colKey">
            {{ col }}
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import baseCe from '../../mixins/component/baseCe'
export default {
  name: 'T3CeTable',
  extends: baseCe,
  props: {
    tableCaption: {
      type: String,
      default: ''
    },
    tableHeaderPosition: {
      type: Number,
      default: 0
    },
    tableClass: {
      type: String,
      default: ''
    },
    tableTfoot: {
      type: String,
      default: '0'
    },
    bodytext: {
      type: Array,
      required: true
    }
  },
  computed: {
    thead () {
      return this.tableHeaderPosition === 1 ? [...this.bodytext].shift() : false
    },
    tbody () {
      const tbody = [...this.bodytext]
      if (this.thead) {
        tbody.shift()
      }
      if (this.tfoot) {
        tbody.pop()
      }
      return tbody
    },
    tfoot () {
      return this.tableTfoot === '1' ? [...this.bodytext].pop() : false
    }
  }
}
</script>
