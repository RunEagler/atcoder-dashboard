<template>
  <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['1']">
    <a-menu-item v-for="menu in menus">
      <a-icon :type="menu.icon" />
      <span>{{ menu.name }}</span>
    </a-menu-item>
  </a-menu>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { MenuItem } from "@/models/menu-item";

@Component({
  name: "layout-menus",
  components: {}
})
export default class layoutMenus extends Vue {
  menus: MenuItem[] = [];

  mounted() {
    this.menus = [
      {
        name: "ユーザ",
        icon: "user",
        path: ""
      }
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
