<template>
  <div>
    <span v-if="condition"><slot></slot></span>
    <span v-else>ー</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'OptionalCell',
  components: {},
})
export default class OptionalCell extends Vue {
  @Prop({ default: false }) condition: boolean;
  mounted() {}
}
</script>

<style scoped lang="scss"></style>
