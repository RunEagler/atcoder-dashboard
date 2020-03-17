<template>
  <div class="white-text">
    日別
    <v-chart :options="progressDailyChart.options" style="width:100%"></v-chart>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ProgressDailyChart } from '@/services/echart/progress-daily.service';
import { Submission } from '@/models/external-api/submission';
import { statisticsModule } from '@/store/modules/statistics.module';
import { now } from 'moment';

@Component({
  name: 'ProgressByDaily',
  components: {},
})
export default class ProgressByDaily extends Vue {
  progressDailyChart: ProgressDailyChart = new ProgressDailyChart();

  mounted() {
    // this.progressDailyChart.addSeries({});
    this.progressDailyChart.addSeries(this.submissionsByDateString);
  }

  get submissionsByDateString(): Map<string, Submission[]> {
    return statisticsModule.submissionsByDateString;
  }
}
</script>

<style scoped lang="scss">
.cell > div {
  background: lightyellow;
  border: dashed 2px;
}
</style>
