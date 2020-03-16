<template>
  <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['1']" @click="handleClick">
    <a-menu-item v-for="(menu, i) in menus" :key="i">
      <a-icon :type="menu.icon" />
      {{ menu.name }}
    </a-menu-item>
  </a-menu>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { MenuItem } from '@/models/menu-item';

@Component({
  name: 'layout-menus',
  components: {},
})
export default class LayoutMenus extends Vue {
  menus: MenuItem[] = [];

  mounted() {
    this.menus = [
      {
        name: 'ユーザ',
        icon: 'user',
        path: '/users',
      },
      {
        name: '問題',
        icon: 'user',
        path: '/problems',
      },
      {
        name: '進捗',
        icon: 'progress',
        path: '/progress',
      },
      {
        name: '統計',
        icon: 'progress',
        path: '/statistics',
      },
    ] as MenuItem[];
  }

  handleClick(e: any) {
    this.$router.push(this.menus[e.key].path);
  }
}
</script>

<style scoped lang="scss">
.cell > div {
  background: lightyellow;
  border: dashed 2px;
}
</style>
