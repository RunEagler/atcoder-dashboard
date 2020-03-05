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
      <template slot="isAnswer" slot-scope="text, record, index">
        <a-icon
          v-if="record.isAnswer"
          type="check-circle"
          theme="filled"
          style="color:#52c41a;"
          class="fs-20"
          @click="handleClickAnswer(index, record)"
        />
        <a-icon v-else type="check-circle" class="fs-20" @click="handleClickAnswer(index, record)" />
      </template>
      <template slot="originalCode" slot-scope="text, record, index">
        <a @click="handleLinkProblemPage(record)" :key="text"
          >{{ selectedContest.originalCode }}{{ text }}_{{ selectedLevel.level }}</a
        >
      </template>
      <template slot="problemTag" slot-scope="text, record, index">
        <a-tag
          v-for="tag in record.tags"
          :key="tag.id"
          closable
          :afterClose="() => handleClose(tag)"
          class="fs-16"
          color="blue"
          @close="handleCloseTag(record.id, tag.id)"
        >
          <span class="fs-20">{{ tag.word }}</span>
        </a-tag>
        <problem-new-tag @blur="handleCreateTag(index, $event)" @select="handleSetTag(index, $event)"></problem-new-tag>
      </template>
      <template slot="action" slot-scope="text, record, index">
        <a-icon
          v-if="record.isFavorite"
          type="heart"
          theme="filled"
          @click="handleClickFavorite(index, record)"
          style="color:#eb2f96;"
          class="fs-20"
        />
        <a-icon v-else type="heart" @click="handleClickFavorite(index, record)" class="fs-20" />
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
import { DeleteTagProblem } from '@/models/request/delete-tag-problem';
import { AddTagProblem } from '@/models/request/add-tag-problem';

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
        title: '',
        key: 'isAnsywer',
        dataIndex: 'isAnswer',
        scopedSlots: { customRender: 'isAnswer' },
        width: '30px',
      },
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
      {
        title: 'action',
        key: 'action',
        scopedSlots: { customRender: 'action' },
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

  handleClickFavorite(problemIndex: number, problem: Problem) {
    this.problemsPerPage.data[problemIndex].isFavorite = !this.problemsPerPage.data[problemIndex].isFavorite;
    problemModule.updateProblem({
      problemID: problem.id,
      isFavorite: problem.isFavorite,
      isAnswer: problem.isAnswer,
    } as UpdateProblem);
  }

  handleClickAnswer(problemIndex: number, problem: Problem) {
    this.problemsPerPage.data[problemIndex].isAnswer = !this.problemsPerPage.data[problemIndex].isAnswer;
    problemModule.updateProblem({
      problemID: problem.id,
      isFavorite: problem.isFavorite,
      isAnswer: problem.isAnswer,
    } as UpdateProblem);
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
    const problem: Problem = this.problemsPerPage.data[index];
    const tag: Tag = tagModule.findTag(tagID);

    problem.tags.push(tag);
    problemModule.addTagProblem({ tagID, problemID: problem.id } as AddTagProblem);
  }

  handleCreateTag(index: number, word: string) {
    const problem: Problem = this.problemsPerPage.data[index];
    if (problem.existTag(word)) {
      return;
    }
    problem.tags.push(
      new Tag().deserialize({
        word,
      }),
    );
    tagModule.addTag(new Tag().deserialize({ word })).then((tag: Tag) => {
      problemModule.addTagProblem({ tagID: tag.id, problemID: problem.id } as AddTagProblem);
      tagModule.fetchTags();
    });
  }

  handleChangeLevel(levelID: number) {
    this.selectedLevel = levelModule.findLevel(levelID);
    problemModule.fetchProblems({
      page: 1,
      levelID,
      contestID: this.selectedContest.id,
    } as FetchProblems);
  }

  handleCloseTag(problemID: number, tagID: number) {
    problemModule.deleteTagProblem({ problemID, tagID } as DeleteTagProblem);
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
