<template>
  <a-layout id="components-layout-demo-custom-trigger" style="height:970px">
    <a-layout-sider :trigger="null" collapsible v-model="collapsed">
      <div class="logo" />
      <layout-menus></layout-menus>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header>
      <a-layout-content>
        <div style="margin: 24px 16px">
          <layout-breadcrubms></layout-breadcrubms>
        </div>
        <div
          :style="{
            margin: '24px 16px',
            padding: '24px',
            background: '#fff',
            minHeight: '600px',
          }"
        >
          <router-view />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import LayoutMenus from '@/views/layout/layout-menus.vue';
import LayoutBreadcrubms from '@/views/layout/layout-breadcrubms.vue';
import { statisticsModule } from '@/store/modules/statistics.module';

@Component({
  name: 'Layout',
  components: { LayoutBreadcrubms, LayoutMenus },
})
export default class Layout extends Vue {
  collapsed: boolean = false;
  mounted() {
    statisticsModule.fetchAC();
    statisticsModule.fetchPoints();
    statisticsModule.fetchProblemDetails();
    statisticsModule.fetchSubmissions();
    statisticsModule.fetchUserLanguage();
  }
}
</script>

<style lang="scss">
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
