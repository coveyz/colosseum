<template>
  <table>
    <thead>
      <tr>
        <th v-for="column in columns"
            :key="column.label">
          {{column.label}}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row,index) in rows"
          :key="index">
        <td v-for="(value,key) in row"
            :key="key">
          {{value}}
        </td>
      </tr>
    </tbody>
  </table>

</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  computed: {
    columns() {
      // console.log('this.$slots.default=>', this.$slots.default)
      return this.$slots.default.map(({ data }) => {
        return { prop: data.attrs.prop, label: data.attrs.label }
      })
    },
    rows() {
      return this.data.map(item => {
        const res = {}
        this.columns.forEach(({ prop }) => {
          res[prop] = item[prop]
        })
        return res
      })
    }
  },
}
</script>

<style lang="scss" scoped>
</style>