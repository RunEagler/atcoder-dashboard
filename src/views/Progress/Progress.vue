<template>
  <a-tabs hideAdd type="card">
    <a-tab-pane tab="問題別" :key="1">
      <progress-by-problem v-if="lazy"></progress-by-problem>
    </a-tab-pane>
    <a-tab-pane tab="日別">
      <progress-by-daily></progress-by-daily>
    </a-tab-pane>
  </a-tabs>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { statisticsModule } from '@/store/modules/statistics.module';
import { ContestType } from '@/constants/contest.enum';
import { LevelType } from '@/constants/level.enum';
import { ProgressChart } from '@/services/echart/progress.service';
import { ColorType } from '@/constants/color.enum';
import ProgressByProblem from '@/views/Progress/ProgressByProblem.vue';
import ProgressByDaily from '@/views/Progress/ProgressByDaily.vue';

@Component({
  name: 'Progress',
  components: { ProgressByDaily, ProgressByProblem },
})
export default class Progress extends Vue {
  lazy: boolean = false;
  async mounted() {
    await statisticsModule.fetchExternalProblems();
    await statisticsModule.fetchSubmissions();
    this.lazy = true;
  }
}
</script>

<style scoped lang="scss">
.cell > div {
  background: lightyellow;
  border: dashed 2px;
}
</style>
