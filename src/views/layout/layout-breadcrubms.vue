<template>
  <a-breadcrumb class="text-left">
    <a-breadcrumb-item v-for="(route, i) in routes" :key="i">{{ route }}</a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Route } from '@/constants/route.enum';
@Component({
  name: 'layout-breadcrubms',
  components: {},
})
export default class LayoutBreadcrubms extends Vue {
  routingPath: string = '';
  mounted() {
    this.routingPath = this.$route.path;
  }

  get routes(): string[] {
    switch (this.routingPath) {
      case Route.Problems:
        return ['home', 'problems'];
        break;
      default:
        return [];
    }
  }
}
</script>

<style scoped lang="scss"></style>
