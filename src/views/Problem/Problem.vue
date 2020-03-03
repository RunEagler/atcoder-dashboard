<template>
  <div class="q-pa-md" v-if="lazy">
    <a-card class="text-left">
      <a-row>
        <a-col span="6">Contest</a-col>
        <a-col span="2">Level</a-col>
        <a-col span="10">Tag</a-col>
      </a-row>
      <a-row>
        <a-col span="6">
          <a-select :defaultValue="selectedContest.id" @change="handleChangeContest" style="width:100%">
            <a-select-option v-for="(contest, i) in contests" :key="`contest-${i}`" :value="contest.id">
              {{ contest.name }}
            </a-select-option>
          </a-select>
        </a-col>
        <a-col span="2">
          <a-select :defaultValue="selectedLevel.id" @change="handleChangeLevel" style="width:100%">
            <a-select-option v-for="(l, i) in levels" :value="l.id" :key="i">
              {{ l.level }}
            </a-select-option>
          </a-select>
        </a-col>
        <a-col span="10">
          <a-select :defaultValue="0" @change="handleChangeTag" style="width:100%">
            <a-select-option :value="0">select filter tag</a-select-option>
            <a-select-option v-for="(t, i) in tags" :value="t.id" :key="i">
              {{ t.word }}
            </a-select-option>
          </a-select>
        </a-col>
      </a-row>
    </a-card>
    <a-table
      :columns="columns"
      :dataSource="problemsPerPage.data"
      bordered
      :pagination="pagination"
      @change="handlePage"
      rowKey="originalCode"
    >
      <template slot="originalCode" slot-scope="text, record, index">
        <a @click="handleLinkProblemPage(record)" :key="text"
          >{{ selectedContest.originalCode }}{{ text }}_{{ selectedLevel.level }}</a
        >
      </template>
      <template slot="problemTag" slot-scope="text, record, index">
        <a-tag
          v-for="tag in record.tags"
          :key="tag.ID"
          closable
          :afterClose="() => handleClose(tag)"
          class="fs-20"
          color="blue"
          @close="handleCloseTag"
        >
          <span class="fs-20">{{ tag.word }}</span>
        </a-tag>
        <problem-new-tag @blur="handleCreateTag(index, $event)" @select="handleSetTag(index, $event)"></problem-new-tag>
      </template>
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
import { FetchProblems } from '@/models/request/fetch-problems';
import { Tag } from '@/models/tag';
import ProblemNewTag from '@/views/Problem/ProblemNewTag.vue';
import { tagModule } from '@/store/modules/tag.module';
import { UpdateProblem } from '@/models/request/update-problem';

@Component({
  name: 'ProblemView',
  components: { ProblemNewTag },
})
export default class ProblemView extends Vue {
  url: string = 'http://atcoder.jp/contests/';
  selectedContest: Contest = new Contest();
  selectedLevel: Level = new Level();
  columns: any[] = [];
  lazy: boolean = false;
  newWord: string = '';

  created() {
    this.columns = [
      {
        title: 'No',
        key: 'originalCode',
        dataIndex: 'originalCode',
        scopedSlots: { customRender: 'originalCode' },
        width: '50px',
      },
      {
        title: 'title',
        key: 'title',
        dataIndex: 'title',
        scopedSlots: { customRender: 'title' },
        width: '200px',
      },
      {
        title: 'problemTag',
        key: 'problemTag',
        scopedSlots: { customRender: 'problemTag' },
        dataIndex: 'problemTag',
      },
    ];
  }

  async mounted() {
    tagModule.fetchTags();
    await levelModule.fetchLevels();
    await contestModule.fetchContests();

    this.selectedContest = this.contests[1];
    this.selectedLevel = this.levels[0];
    this.fetchProblems({
      page: 1,
      levelID: this.selectedLevel.id,
      contestID: this.selectedContest.id,
    });
    this.lazy = true;
  }

  get pagination() {
    if (this.problemsPerPage.data === undefined) {
      return {
        current: 0,
        pageSize: 0,
        total: 0,
      };
    }
    return {
      current: this.problemsPerPage.currentPage,
      pageSize: this.problemsPerPage.perPage,
      total: this.problemsPerPage.total,
    };
  }

  handleLinkProblemPage(problem: Problem) {
    const url: string = `${this.url}${this.selectedContest.originalCode}${problem.originalCode}/tasks/${problem.lastPath}`;
    window.open(url, '_blank');
  }

  get levels(): Level[] {
    return levelModule.levels;
  }

  get contests(): Contest[] {
    return contestModule.contests;
  }

  get problemsPerPage(): Pagination<Problem> {
    return problemModule.problemsPerPage;
  }

  get tags(): Tag[] {
    return tagModule.tags;
  }

  handleChangeContest(contestID: number) {
    this.selectedContest = contestModule.findContest(contestID);
    problemModule.fetchProblems({
      page: 1,
      levelID: this.selectedLevel.id,
      contestID,
    } as FetchProblems);
  }

  handleSetTag(index: number, tagID: number) {
    const targetProblem: Problem = this.problemsPerPage.data[index];
    const tag: Tag = tagModule.findTag(tagID);

    targetProblem.tags.push(tag);
    problemModule.updateTagProblem({ problemID: targetProblem.id, tags: targetProblem.tags } as UpdateProblem);
  }

  handleCreateTag(index: number, value: string) {
    this.problemsPerPage.data[index].tags.push(
      new Tag().deserialize({
        word: value,
      }),
    );
    tagModule.addTag(new Tag().deserialize({ word: value }));
  }

  handleChangeLevel(levelID: number) {
    this.selectedLevel = levelModule.findLevel(levelID);
    problemModule.fetchProblems({
      page: 1,
      levelID,
      contestID: this.selectedContest.id,
    } as FetchProblems);
  }

  handleCloseTag(problemIndex: number, tagIndex: number) {
    this.problemsPerPage.data[problemIndex].tags.splice(tagIndex, 1);
    problemModule.updateTagProblem({
      problemID: this.problemsPerPage.data[problemIndex].id,
      tags: this.problemsPerPage.data[problemIndex].tags,
    } as UpdateProblem);
  }

  fetchProblems(fetchProblems: FetchProblems) {
    problemModule.fetchProblems(fetchProblems);
  }

  handleChangeTag() {}

  handlePage(page: any) {
    problemModule.fetchProblems({
      page: page.current,
      levelID: this.selectedLevel.id,
      contestID: this.selectedContest.id,
    } as FetchProblems);
  }
}
</script>

<style scoped lang="scss">
.cell > div {
  background: lightyellow;
  border: dashed 2px;
}
</style>
