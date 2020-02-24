<template>
  <div class="q-pa-md">
    <a-radio-group @change="handleChangeContest" v-model="selectedContestID">
      <a-radio-button v-for="contest in contests" :value="contest.id">{{ contest.name }}</a-radio-button>
    </a-radio-group>

    <a-select :size="size" defaultValue="a1" style="width: 200px" @change="handleChangeLevel">
      <a-select-option v-for="(level, i) in levels" :key="i" :value="level.id">
        {{ level.level }}
      </a-select-option>
    </a-select>
    {{ contest }}
    <a-table
      :columns="columns"
      :dataSource="problemsPerPage.data"
      bordered
      :pagination="pagination"
      @change="handlePage"
    >
      <template slot="originalCode" slot-scope="text, record, index">
        <a :href="url + contest.originalCode + text">{{ contest.originalCode }}{{ text }}</a>
      </template>
      <!--<template slot="title" slot-scope="text, record, index">-->
      <!--{{ text }}-->
      <!--</template>-->
    </a-table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { contestModule } from '@/store/modules/contest.module';
import { Contest } from '@/models/contest';
import { problemModule } from '@/store/modules/problem.module';
import { Problem } from '@/models/problem';
import { Pagination } from '@/models/pagination';
import { levelModule } from '@/store/modules/level.module';
import { Level } from '@/models/level';

@Component({
  name: 'ProblemView',
  components: {},
})
export default class ProblemView extends Vue {
  url: string = 'http://atcoder.jp/contests/';
  selectedContestID: number = 0;
  columns: any[] = [];

  mounted() {
    levelModule.fetchLevels();
    contestModule.fetchContests();

    this.columns = [
      {
        title: 'No',
        key: 'originalCode',
        dataIndex: 'originalCode',
        scopedSlots: { customRender: 'originalCode' },
      },
      {
        title: 'title',
        key: 'title',
        dataIndex: 'title',
        scopedSlots: { customRender: 'title' },
      },
      {
        title: 'score',
        key: 'score',
        dataIndex: 'score',
      },
      {
        title: 'level',
        key: 'level',
        dataIndex: 'level',
      },
    ];
  }

  get pagination() {
    return {
      current: this.problemsPerPage.currentPage,
      pageSize: this.problemsPerPage.perPage,
      total: this.problemsPerPage.total,
    };
  }

  get levels(): Level[] {
    return levelModule.levels;
  }

  get contest(): Contest {
    return contestModule.contest(this.selectedContestID);
  }

  get contests(): Contest[] {
    return contestModule.contests;
  }

  get problemsPerPage(): Pagination<Problem> {
    return problemModule.problemsPerPage;
  }

  handleChangeContest() {
    problemModule.fetchProblems(this.selectedContestID);
  }

  handleChangeLevel(levelID: number) {
    problemModule.fetchProblems(levelID);
  }

  handlePage(value: number) {}
}
</script>

<style scoped lang="scss">
.cell > div {
  background: lightyellow;
  border: dashed 2px;
}
</style>
