import { EChartService } from '@/services/echart/echart.service';
import { ColorType } from '@/constants/color.enum';
import { Submission } from '@/models/external-api/submission';

export class ProgressDailyChart extends EChartService {
  readonly colors: any = {
    red: {
      main: '#f5222d',
      sub: '#ffccc7',
    },
    blue: {
      main: '#1890ff',
      sub: '#bae7ff',
    },
    green: {
      main: '#52c41a',
      sub: '#d9f7be',
    },
    purple: {
      main: '#722ed1',
      sub: '#efdbff',
    },
    orange: {
      main: '#fa8c16',
      sub: '#ffe7ba',
    },
  };
  title: string;
  innerRadius: number;
  outerRadius: number;
  circleColor: any;
  completedCount: number;
  overallCount: number;
  xAxisData: string[] = [];

  constructor() {
    super();
    let start: Date = new Date(2019, 0, 1);
    while (start.getTime() < new Date().getTime()) {
      this.xAxisData.push(start.toLocaleDateString());
      start.setDate(start.getDate() + 1);
    }
  }

  setColor(colorType: ColorType) {
    switch (colorType) {
      case ColorType.Blue:
        this.circleColor = this.colors.blue;
        break;
      case ColorType.Green:
        this.circleColor = this.colors.green;
        break;
      case ColorType.Orange:
        this.circleColor = this.colors.orange;
        break;
      case ColorType.Purple:
        this.circleColor = this.colors.purple;
        break;
      case ColorType.Red:
        this.circleColor = this.colors.red;
        break;
    }
  }

  addSeries(submissionsByDateString: Map<string, Submission[]>): void {
    const sumPointByDate: number[] = this.xAxisData.map((dateString: string) => {
      if (!submissionsByDateString.has(dateString)) {
        return 0;
      }
      const submissions: Submission[] = submissionsByDateString.get(dateString) || [];
      return submissions.reduce((result: number, submission: Submission) => {
        result += submission.point;
        return result;
      }, 0);
    });
    const lineSeries: any = {
      name: '計',
      type: 'line',
      symbolSize: 10,
      symbol: 'circle',
      data: sumPointByDate,
      itemStyle: {
        normal: {
          color: 'rgba(252,230,48,1)',
          barBorderRadius: 0,
          label: {
            show: true,
            position: 'top',
            formatter: function(p: any) {
              return p.value > 0 ? p.value : '';
            },
          },
        },
      },
      markLine: {
        silent: true,
        data: [
          {
            yAxis: 50,
          },
          {
            yAxis: 100,
          },
          {
            yAxis: 150,
          },
          {
            yAxis: 200,
          },
          {
            yAxis: 300,
          },
        ],
      },
    };
    this.series.push(lineSeries);
    // const barSeries: any = {
    //   type: 'bar',
    //   stack: 'AC',
    //   barMaxWidth: 35,
    //   barGap: '10%',
    //   itemStyle: {
    //     normal: {
    //       color: 'rgba(255,144,128,1)',
    //       label: {
    //         show: true,
    //         textStyle: {
    //           color: '#fff',
    //         },
    //         position: 'inside',
    //         formatter: function(p: any) {
    //           return p.value > 0 ? p.value : '';
    //         },
    //       },
    //     },
    //   },
    // };
    // const lineSeries: any = {
    //   name: '計',
    //   type: 'line',
    //   symbolSize: 10,
    //   symbol: 'circle',
    //   itemStyle: {
    //     normal: {
    //       color: 'rgba(252,230,48,1)',
    //       barBorderRadius: 0,
    //       label: {
    //         show: true,
    //         position: 'top',
    //         formatter: function(p: any) {
    //           return p.value > 0 ? p.value : '';
    //         },
    //       },
    //     },
    //   },
    // };
    // const abc: any = Object.assign({}, barSeries);
    // abc.name = 'ABC';
    // abc.data = [];
    // const arc: any = Object.assign({}, barSeries);
    // arc.name = 'ARC';
    // arc.data = [];
    // const agc: any = Object.assign({}, barSeries);
    // agc.name = 'AGC';
    // agc.data = [];
    // this.series.push(lineSeries);
    // this.series.push(abc);
    // this.series.push(arc);
    // this.series.push(agc);
  }

  get progressPercent(): number {
    return Math.round((this.completedCount / this.overallCount) * 100);
  }

  get options() {
    const self: any = this;
    return {
      title: {
        text: this.title,
        x: 'center',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          textStyle: {
            color: '#fff',
          },
        },
      },
      // tooltip: {
      //   trigger: 'item',
      //   formatter: '{b} : {c} count',
      // },
      calculable: true,
      // dataZoom: [
      //   {
      //     startValue: '2019-01-01',
      //     type: 'slider',
      //     xAxisIndex: [0],
      //   },
      // ],
      xAxis: [
        {
          axisLine: {
            lineStyle: {
              color: '#90979c',
            },
          },
          data: this.xAxisData,
        },
      ],
      yAxis: [
        {
          type: 'value',
          splitLine: {
            show: false,
          },
          textStyle: {
            color: 'white',
          },
        },
      ],
      // dataZoom: [
      //   {
      //     show: true,
      //     height: 30,
      //     xAxisIndex: [0],
      //     bottom: 30,
      //     start: 10,
      //     end: 80,
      //     textStyle: {
      //       color: '#fff',
      //     },
      //     borderColor: '#90979c',
      //   },
      //   {
      //     type: 'inside',
      //     show: true,
      //     height: 15,
      //     start: 1,
      //     end: 35,
      //   },
      // ],
      visualMap: {
        top: 10,
        right: 10,
        pieces: [
          {
            gt: 0,
            lte: 1000,
            color: '#096',
          },
          {
            gt: 1000,
            lte: 2000,
            color: '#ffde33',
          },
          {
            gt: 2000,
            lte: 3000,
            color: '#ff9933',
          },
          {
            gt: 3000,
            lte: 4000,
            color: '#cc0033',
          },
          {
            gt: 4000,
            lte: 5000,
            color: '#660099',
          },
          {
            gt: 5000,
            color: '#7e0023',
          },
        ],
        outOfRange: {
          color: '#999',
        },
      },

      series: this.series,
    };
  }
}
