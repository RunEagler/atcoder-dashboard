<template>
  <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['1']">
    <a-menu-item v-for="(menu, i) in menus" :key="i">
      <a-icon :type="menu.icon" />
      <router-link :to="menu.path">{{ menu.name }}</router-link>
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
        path: '/',
      },
      {
        name: '問題',
        icon: 'user',
        path: '/problems',
      },
    ] as MenuItem[];
  }
}
</script>

<style scoped lang="scss">
.cell > div {
  background: lightyellow;
  border: dashed 2px;
}
</style>
