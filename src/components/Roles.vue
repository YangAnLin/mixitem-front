<template>
  <div>

    <a-card style="box-shadow: 5px 5px 5px #888888;">
      <!-- 面包屑 -->
      <a-breadcrumb style="margin-bottom: 5px">
        <a-breadcrumb-item>权限管理</a-breadcrumb-item>
        <a-breadcrumb-item>角色列表</a-breadcrumb-item>
      </a-breadcrumb>

      <!-- 表格 -->
      <a-table :columns="columns" rowKey="id" :data-source="data" :pagination="false" :filterMultiple="false" @onSelect="se"/>
    </a-card>
  </div>
</template>

<script>

// const rowSelection = {
//   onChange: (selectedRowKeys, selectedRows) => {
//     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
//   },
//   onSelect: (record, selected, selectedRows) => {
//     console.log(record, selected, selectedRows);
//   },
//   onSelectAll: (selected, selectedRows, changeRows) => {
//     console.log(selected, selectedRows, changeRows);
//   },
// };

export default {
  name: 'Roles',
  data() {

    return {
      // rowSelection,
      data: [
      ],
      pageSizeOptions: ['10', '20', '30', '40'],
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: '权限名称',
          dataIndex: 'name',
          key: 'name',
        }
      ],
    }
  },
  created() {
    this.query();
  },
  methods: {
    // 查询
    query() {
      this.$axios.get("http://localhost:20001/roles/list").then(res => {
        console.log("角色的数据", res.data.data)
        let response = res.data.data
        // 数据
        this.data = response
      })
    },
    se(record, selected){
      console.log(record, selected);
    },
    rowSelection(){

    }
  }
};

</script>

<style scoped>

</style>