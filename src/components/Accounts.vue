<template>
  <div>
    <a-card>
      <!-- 面包屑 -->
      <a-breadcrumb style="margin-bottom: 5px">
        <a-breadcrumb-item>用户管理</a-breadcrumb-item>
        <a-breadcrumb-item>会员列表</a-breadcrumb-item>
      </a-breadcrumb>

      <!-- 筛选条件 -->
      <a-form layout="inline">

        <a-form-model-item label="注册IP">
          <a-input v-model="queryForm.registerIp"/>
        </a-form-model-item>

        <a-form-model-item label="状态">
          <a-select v-model="queryForm.running">
            <a-select-option value="-1">
              全部
            </a-select-option>
            <a-select-option value="0">
              正常
            </a-select-option>
            <a-select-option value="1">
              冻结
            </a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item label="开始时间">
          <a-date-picker
              v-model="queryForm.registerStartDate"
              show-time
              type="date"
              placeholder="输入开始注册时间"
              style="width: 100%;"/>
        </a-form-model-item>

      </a-form>

      <a-divider>分割线</a-divider>

      <!-- 表格 -->
      <a-table
          show-size-changer
          :columns="columns"
          rowKey="id"
          :data-source="table_data"
          bordered
          :pagination=false>
        <template slot="birthday" slot-scope="text">
          {{ text | dateformat('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </a-table>
      <a-pagination
          :total=total
          :show-total="total => `共有 ${total} 条数据`"
          :page-size=size
          :default-current="1"
          :defaultPageSize=size
          :pageSize-options="pageSizeOptions"
          @change="changePage"
          style="margin-top: 10px"
      />

    </a-card>
  </div>


</template>

<script>

export default {
  name: 'GameUserManager',
  data() {

    return {
      // 当前页
      current: 1,
      // 每页条数
      size: 10,
      // 总条数
      total: 0,
      table_data: [],
      pageSizeOptions: ['10', '20', '30', '40'],
      columns: [
        {
          title: '用户ID',
          dataIndex: 'id',
        },
        {
          title: '用户账号',
          dataIndex: 'account',
        },
        {
          title: '昵称',
          dataIndex: 'nickName',
        },
        {
          title: '生日',
          dataIndex: 'birthday',
          scopedSlots: {customRender: 'birthday'}
        },
      ],
      labelCol: {span: 1},
      wrapperCol: {span: 2},
      queryForm: {
        registerIp: '',
        registerStartDate: '2020-01-01 00:00:00',
        running: "-1"
      },
    }
  },
  created() {
    this.query();
  },
  methods: {
    // 翻页
    changePage(page, pageSize) {
      this.current = page
      this.size = pageSize
      this.query()
    },
    // 查询
    query() {
      console.log(this.current)
      console.log(this.queryParam)
      this.$axios.post("http://localhost:20001/account/list", {
        current: this.current,
        size: this.size,
        searchParams: this.queryForm
      }).then(res => {
        console.log("返回的数据", res.data.data.data)
        let response = res.data.data
        // 数据
        this.table_data = response.data
        // 总条数
        this.total = response.total
        // // 当前页
        this.current = response.current
      })
    },
  }
};


</script>

<style scoped="scoped">
#components-layout-demo-top-side .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
</style>
