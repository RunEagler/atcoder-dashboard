<template>
  <div>
    <a-card style="background:#595959">
      ABC
      <a-row type="flex">
        <a-col :span="4" v-for="chart in abcCharts">
          <v-chart :options="chart.options" style="width:150px;height:220px;"></v-chart>
        </a-col>
      </a-row>
    </a-card>
    <a-card style="background:#595959">
      <a-row type="flex">
        <a-col :span="4" v-for="chart in arcCharts">
          <v-chart :options="chart.options" style="width:150px;height:220px;"></v-chart>
        </a-col>
      </a-row>
    </a-card>
    <a-card style="background:#595959">
      <a-row type="flex">
        <a-col :span="4" v-for="chart in agcCharts">
          <v-chart :options="chart.options" style="width:150px;height:220px;"></v-chart>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ProgressChart } from '@/services/echart/progress.service';
import { statisticsModule } from '@/store/modules/statistics.module';
import { ContestType } from '@/constants/contest.enum';
import { ColorType } from '@/constants/color.enum';
import { LevelType } from '@/constants/level.enum';

@Component({
  name: 'ProgressByProblem',
  components: {},
})
export default class ProgressByProblem extends Vue {
  options: any = {};
  abcCharts: ProgressChart[] = [];
  arcCharts: ProgressChart[] = [];
  agcCharts: ProgressChart[] = [];

  async mounted() {
    const abcRankMap: Map<string, number> =
      this.countByLevelByContest.get(ContestType.ABC) || new Map<string, number>();
    const arcRankMap: Map<string, number> =
      this.countByLevelByContest.get(ContestType.ARC) || new Map<string, number>();
    const agcRankMap: Map<string, number> =
      this.countByLevelByContest.get(ContestType.AGC) || new Map<string, number>();

    const acAbcRankMap: Map<string, number> =
      this.acCountByLevelByContest.get(ContestType.ABC) || new Map<string, number>();
    const acArcRankMap: Map<string, number> =
      this.acCountByLevelByContest.get(ContestType.ARC) || new Map<string, number>();
    const acAgcRankMap: Map<string, number> =
      this.acCountByLevelByContest.get(ContestType.AGC) || new Map<string, number>();

    console.log(this.countByLevelByContest);
    console.log(this.acCountByLevelByContest);

    this.abcCharts = [
      new ProgressChart('A', ColorType.Green, abcRankMap.get(LevelType.A) || 1, acAbcRankMap.get(LevelType.A) || 0),
      new ProgressChart('B', ColorType.Green, abcRankMap.get(LevelType.B) || 1, acAbcRankMap.get(LevelType.B) || 0),
      new ProgressChart('C', ColorType.Green, abcRankMap.get(LevelType.C) || 1, acAbcRankMap.get(LevelType.C) || 0),
      new ProgressChart('D', ColorType.Green, abcRankMap.get(LevelType.D) || 1, acAbcRankMap.get(LevelType.D) || 0),
      new ProgressChart('E', ColorType.Green, abcRankMap.get(LevelType.E) || 1, acAbcRankMap.get(LevelType.E) || 0),
      new ProgressChart('F', ColorType.Green, abcRankMap.get(LevelType.F) || 1, acAbcRankMap.get(LevelType.F) || 0),
    ];
    this.arcCharts = [
      new ProgressChart('A', ColorType.Blue, arcRankMap.get(LevelType.A) || 1, acArcRankMap.get(LevelType.A) || 0),
      new ProgressChart('B', ColorType.Blue, arcRankMap.get(LevelType.B) || 1, acArcRankMap.get(LevelType.B) || 0),
      new ProgressChart('C', ColorType.Blue, arcRankMap.get(LevelType.C) || 1, acArcRankMap.get(LevelType.C) || 0),
      new ProgressChart('D', ColorType.Blue, arcRankMap.get(LevelType.D) || 1, acArcRankMap.get(LevelType.D) || 0),
    ];

    this.agcCharts = [
      new ProgressChart('A', ColorType.Red, agcRankMap.get(LevelType.A) || 1, acAgcRankMap.get(LevelType.A) || 0),
      new ProgressChart('B', ColorType.Red, agcRankMap.get(LevelType.B) || 1, acAgcRankMap.get(LevelType.B) || 0),
      new ProgressChart('C', ColorType.Red, agcRankMap.get(LevelType.C) || 1, acAgcRankMap.get(LevelType.C) || 0),
      new ProgressChart('D', ColorType.Red, agcRankMap.get(LevelType.D) || 1, acAgcRankMap.get(LevelType.D) || 0),
      new ProgressChart('E', ColorType.Red, agcRankMap.get(LevelType.E) || 1, acAgcRankMap.get(LevelType.E) || 0),
      new ProgressChart('F', ColorType.Red, agcRankMap.get(LevelType.F) || 1, acAgcRankMap.get(LevelType.F) || 0),
    ];
  }

  get countByLevelByContest(): Map<string, Map<string, number>> {
    return statisticsModule.countByLevelByContest;
  }

  get acCountByLevelByContest(): Map<string, Map<string, number>> {
    return statisticsModule.acCountByLevelByContest;
  }
}
</script>

<style scoped lang="scss">
.cell > div {
  background: lightyellow;
  border: dashed 2px;
}
</style>
