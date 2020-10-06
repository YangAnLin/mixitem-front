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

<!--            <a-sub-menu key="sub1" @click="toPage">-->
<!--              <span slot="title"><a-icon type="user"/>首页</span>-->
<!--              <a-menu-item v-for="subItem in submenu" :key="subItem.menuUrl" :index="subItem.menuUrl" @click="add(subItem)" @change="toPage(subItem.path)">-->
<!--                {{ subItem.menuName }}-->
<!--              </a-menu-item>-->
<!--            </a-sub-menu>-->


            <a-sub-menu v-for="subItem in submenu" :key="subItem.id" @click="toPage">
              <!-- 一级 -->
              <span slot="title"><a-icon type="appstore"/><span>{{ subItem.menuName }}</span></span>

              <!-- 二级 -->
              <a-menu-item v-for="sub in subItem.children" :key="sub.menuUrl" :index="sub.menuUrl" @click="add(sub)" @change="toPage(sub.menuUrl)">
                {{ sub.menuName }}
              </a-menu-item>

            </a-sub-menu>

          </a-menu>
        </a-layout-sider>

        <!-- 内容 -->
        <a-layout-content :style="{ padding: '0 24px', minHeight: '800px' }">
          <!-- 选项卡 -->
          <a-tabs v-model="activeKey" hide-add type="editable-card" @edit="onEdit" @change="change">
            <a-tab-pane v-for="pane in panes" :key="pane.key" :tab="pane.title" :closable="pane.closable">
              <!--路由占位符-->
              <router-view/>
            </a-tab-pane>
          </a-tabs>
        </a-layout-content>

      </a-layout>
    </a-layout-content>
  </a-layout>
</template>

<script>

export default {
  data() {
    const panes = [
      {title: '首页写', key: '0', closable: false},
    ];
    return {
      // 当前激活 tab 面板的 key
      activeKey: panes[0].key,
      // 所有选项卡集合
      panes,
      newTabIndex: 0,
      submenu: [
        // {text: '首页', path: '/', index: '/'},
        // {text: '用户管理', path: '/gameUserManager', index: '/gameUserManager'},
        // {text: '权限管理', path: '/permissions', index: '/permissions'},
        // {text: '角色管理', path: '/roles', index: '/roles'}
      ]
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
        // 总条数
        this.total = response.total
        // // 当前页
        this.current = response.current
      })
    },
    // 添加选项卡
    add(obj) {
      // 判断标签是否已经存在了
      for (const page of this.panes) {
        if (page.title == obj.text) {   // 已经存在了,就跳转到指定的地方
          console.log("已经存在", page)
          this.activeKey = page.key;
          return;
        }
      }

      console.log("会不会调用下面的")

      const panes = this.panes;
      const activeKey = `${obj.text}${this.newTabIndex++}`;
      panes.push({
        title: obj.menuName,
        key: activeKey,
        index: obj.index,
        content: `Content of new Tab ${activeKey}`,
      });
      this.panes = panes;
      this.activeKey = activeKey;
    },

    // 关闭选项卡
    onEdit(targetKey, action) {
      console.log("edit", targetKey, action)
      this[action](targetKey);
    },

    // 切换选项卡
    change(activeKey) {
      console.log("切换到{}选项卡", activeKey);

      for (const page of this.panes) {
        console.log("1循环李的page", page)
        if (page.key == this.activeKey) {
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

    // 打开页面
    toPage(path) {
      console.log("topage调用", path)
      this.$router.push(path.key).catch(err => err)
    }
  }
};
</script>

<style>
</style>
