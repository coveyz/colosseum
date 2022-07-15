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
      // 犹豫不一定有prop, 那不如果出现了 默认的作用域插槽，则就按照它来渲染
      // console.log('this.$slots.default=>', this.$slots.default)
      // return this.$slots.default.map(({ data }) => {
      //   console.log('data=>', data)
      //   return { prop: data.attrs.prop, label: data.attrs.label }
      // })

      return this.$slots.default.map(({ data: { attrs, scopedSlots } }) => {
        const column = { ...attrs }
        // console.log('column=>', column, 'slots', scopedSlots)
        if (scopedSlots) {
          column.renderCell = (row, i) => <div> {scopedSlots.default({ row, $index: i })} </div>
        } else {
          column.renderCell = (row) => {
            return <div> {row[column['prop']]} </div>
          }
        }
        return column
      })
    },
    // 作废
    // rows() {
    //   return this.data.map(item => {
    //     const res = {}
    //     this.columns.forEach(({ prop }) => {
    //       res[prop] = item[prop]
    //     })
    //     return res
    //   })
    // }
  },
  render() {
    return (
      <table>
        <thead>
          <tr>
            {
              this.columns.map(column => {
                return <th key={column.label}>{column.label}</th>
              })
            }
          </tr>
        </thead>
        <tbody>
          {/* {
            this.rows.map((row, index) => {
              const tds = Object.keys(row).map(td => {
                return <td key={td}> {row[td]} </td>
              })
              return <tr key={index}>
                {tds}
              </tr>
            })
          } */}
          {
            this.data.map((row, rowIndex) => {
              // const tds = Object.keys(row)
              // console.log('row=>', row, 'tds=>', tds, this.columns)
              return <tr key={rowIndex}>
                {
                  this.columns.map((col, colIndex) => {
                    return <td key={colIndex}>
                      {col.renderCell(row, rowIndex)}
                    </td>
                  })
                }
              </tr>
            })
          }

        </tbody>
      </table>
    )
  }
}
</script>

<style lang="scss" scoped>
</style>
