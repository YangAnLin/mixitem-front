<template>
  <a-layout id="components-layout-demo-top-side">
    <!-- header -->
    <a-layout-header class="header">
      <div class="logo"/>
      <a-menu
          theme="dark"
          mode="horizontal"
          :default-selected-keys="['2']"
          :style="{ lineHeight: '64px' }"
      >
      </a-menu>
    </a-layout-header>


    <!-- 下面 -->
    <a-layout-content>

      <a-layout style="padding: 24px 0; background: #ffffff;height: 800px">

        <!-- 左边 -->
        <a-layout-sider width="200" style="background: #fff">
          <!-- 菜单 -->
          <a-menu mode="inline" :default-selected-keys="['1']" :default-open-keys="['sub1']" style="height: 100%">

            <a-sub-menu v-for="subItem in submenu" :key="subItem.id">
              <!-- 一级 -->
              <span slot="title"><a-icon type="appstore"/><span>{{ subItem.menuName }}</span></span>

              <!-- 二级 -->
              <a-menu-item v-for="sub in subItem.children" :key="sub.id" :index="sub.menuUrl" @click="open(sub)">
                {{ sub.menuName }}
              </a-menu-item>

            </a-sub-menu>

          </a-menu>
        </a-layout-sider>

        <!-- 内容 -->
        <a-layout-content :style="{ padding: '0 24px', minHeight: '800px' }">
          <!-- 选项卡 -->
<!--          <a-tabs v-model="activeKey" hide-add type="editable-card" @edit="onEdit" @change="change">-->
<!--            <a-tab-pane v-for="pane in panes" :key="pane.key" :tab="pane.title" :closable="pane.closable">-->
<!--              &lt;!&ndash;路由占位符&ndash;&gt;-->
<!--              <router-view/>-->
<!--            </a-tab-pane>-->
<!--          </a-tabs>-->
          <router-view/>
        </a-layout-content>

      </a-layout>
    </a-layout-content>
  </a-layout>
</template>

<script>

export default {
  data() {
    const panes = [
      {title: '首页写', id: '0', closable: false},
    ];
    return {
      // 当前激活 tab 面板的 key
      activeKey: panes[0].id,
      // 所有选项卡集合
      panes,
      newTabIndex: 0,
      submenu: []
    }
  },
  created() {
    this.queryPermissions();
  },
  methods: {
    queryPermissions() {
      this.$axios.get("http://localhost:20001/account/menus").then(res => {
        console.log("返回的数据", res.data.data)
        let response = res.data.data
        // 数据
        this.submenu = response
      })
    },
    // 添加选项卡
    open(obj){
      this.$router.push(obj.menuUrl).catch(err => err)
    },
    add(obj) {
      // 判断标签是否已经存在了
      for (const page of this.panes) {
        if (page.key === obj.id) {   // 已经存在了,就跳转到指定的地方
          console.log("已经存在", page)
          this.activeKey = page.key;
          return;
        }
      }

      console.log("会不会调用下面的")

      this.panes.push({
        title: obj.menuName,
        key: obj.id,
        url:obj.menuUrl,
      });
      this.activeKey = obj.id;
      this.$router.push(obj.menuUrl).catch(err => err)
    },

    // 关闭选项卡
    onEdit(targetKey, action) {
      this[action](targetKey);
    },

    // 切换选项卡
    change(activeKey) {

      for (const page of this.panes) {
        console.log("1循环李的page", page)
        if (page.key === activeKey) {
          console.log("2循环李的page", page)
          this.activeKey = page.key;
          return;
        }
      }
    },

    // 删除选项卡
    remove(targetKey) {
      let activeKey = this.activeKey;
      let lastIndex;
      this.panes.forEach((pane, i) => {
        if (pane.key === targetKey) {
          lastIndex = i - 1;
        }
      });
      const panes = this.panes.filter(pane => pane.key !== targetKey);
      if (panes.length && activeKey === targetKey) {
        if (lastIndex >= 0) {
          activeKey = panes[lastIndex].key;
        } else {
          activeKey = panes[0].key;
        }
      }
      this.panes = panes;
      this.activeKey = activeKey;
    },
  }
};
</script>

<style>
</style>
