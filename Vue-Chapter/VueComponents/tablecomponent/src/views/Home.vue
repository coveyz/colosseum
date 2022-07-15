<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <k-table :data="tableData">
      <k-table-column prop="date"
                      label="日期" />
      <k-table-column prop="name"
                      label="姓名" />
      <k-table-column prop="address"
                      label="地址" />
      <k-table-column prop="address"
                      label="测试">
        <template v-slot:default="scope">
          {{scope.row.date}} 
        </template>
      </k-table-column>
      <k-table-column label="操作">
        <template v-slot:default="scope">
          <button @click="handleEdit(scope.$index,scope.row)">编辑</button>
          <button @click="handleDelete(scope.$index,scope.row)">删除</button>
        </template>
      </k-table-column>
    </k-table>

  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import KTable from '@/components/KTable'
import KTableColumn from '@/components/KTableColumn'

export default {
  name: "Home",
  components: {
    // HelloWorld,
    KTable,
    KTableColumn
  },
  data() {
    return {
      tableData: [
        {
          date: '2016-05-01',
          name: '1',
          address: '1-1'
        }, {
          date: '2016-05-02',
          name: '2',
          address: '1-2'
        }, {
          date: '2016-05-03',
          name: '3',
          address: '1-3'
        }
      ]
    }
  },
  methods: {
    handleEdit() {
      console.log('edit')
    },
    handleDelete(index, row) {
      console.log('delete', index, row)
    }
  },
};
</script>
