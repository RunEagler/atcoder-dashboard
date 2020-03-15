<template>
  <div>
    <v-chart v-if="this.frequencyByLanguage.size > 0" :options="option" style="width:1200px;height:1200px;"></v-chart>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Submission } from '@/models/external-api/submission';
import { statisticsModule } from '@/store/modules/statistics.module';
import { UserLanguage } from '@/models/external-api/user-language';

@Component({
  name: 'Progress',
  components: {},
})
export default class Progress extends Vue {
  option: any = {};

  async mounted() {
    const languages: string[] = await Array.from(this.frequencyByLanguage.keys());
    const keyValue: any[][] = Array.from(this.frequencyByLanguage.entries()).sort(
      (a: [string, number], b: [string, number]) => {
        return b[1] - a[1];
      },
    );
    this.option = {
      title: {
        text: 'ユーザ別使用言語割合',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: languages,
      },
      series: [
        {
          name: 'プログラミング言語',
          type: 'pie',
          radius: '80%',
          center: ['55%', '60%'],
          data: keyValue.map((languageAndFreq: string[]) => {
            return {
              name: languageAndFreq[0],
              value: languageAndFreq[1],
            };
          }),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
  }

  get frequencyByLanguage(): Map<string, number> {
    return statisticsModule.frequencyByLanguage;
  }

  get submissions(): Submission[] {
    return statisticsModule.submissions;
  }
}
</script>

<style scoped lang="scss">
.cell > div {
  background: lightyellow;
  border: dashed 2px;
}
</style>
