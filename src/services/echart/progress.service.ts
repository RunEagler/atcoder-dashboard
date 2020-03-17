import { EChartService } from '@/services/echart/echart.service';
import { ColorType } from '@/constants/color.enum';

export class ProgressChart extends EChartService {
  readonly colors: any = {
    green: {
      main: '#9254de',
      sub: '#f9f0ff',
    },
    blue: {
      main: '#13c2c2',
      sub: '#e6fffb',
    },
    red: {
      main: '#fa541c',
      sub: '#fff2e8',
    },
    // red: {
    //   main: '#f5222d',
    //   sub: '#ffccc7',
    // },
    // blue: {
    //   main: '#1890ff',
    //   sub: '#bae7ff',
    // },
    // green: {
    //   main: '#52c41a',
    //   sub: '#d9f7be',
    // },
    // purple: {
    //   main: '#722ed1',
    //   sub: '#efdbff',
    // },
    // orange: {
    //   main: '#fa8c16',
    //   sub: '#ffe7ba',
    // },
  };
  title: string;
  innerRadius: number;
  outerRadius: number;
  circleColor: any;
  completedCount: number;
  overallCount: number;

  constructor(
    title: string,
    colorType: ColorType,
    overallCount: number,
    completedCount: number,
    innerRadius: number = 45,
    outerRadius: number = 60,
  ) {
    super();
    this.title = title;
    this.innerRadius = innerRadius;
    this.outerRadius = outerRadius;
    this.completedCount = completedCount;
    this.overallCount = overallCount;
    this.setColor(colorType);
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

  addSeries(chartData: any): void {}

  get progressPercent(): number {
    return Math.round((this.completedCount / this.overallCount) * 100);
  }

  get options() {
    const self: any = this;
    return {
      title: {
        text: this.title,
        x: 'center',
        textStyle: {
          color: 'white',
        },
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {c} count',
      },
      legend: {
        orient: 'vertical',
        x: 'right',
        y: 'bottom',
        data: ['AC', 'NA'],
        textStyle: {
          fontSize: 14,
          color: 'white',
        },
        // formatter: function(name: string): string {
        //   let count: number;
        //   let data: any = self.chartOptions.series[0].data;
        //   data.forEach((d: any) => {
        //     if (d.name === name) {
        //       count = d.value;
        //     }
        //   });
        //   // return `${name}：${('$'.repeat(len) + count).slice(-len).replace(/\$/g, '  ')}名`;
        // },
      },
      series: [
        {
          name: 'progress',
          type: 'pie',
          radius: [this.innerRadius, this.outerRadius],
          center: ['50%', `50%`],
          data: [
            {
              value: this.completedCount,
              name: 'AC',
              label: {
                normal: {
                  formatter(params: any) {
                    return `${self.completedCount}/${self.overallCount}`;
                  },
                  position: 'center',
                  show: true,
                  textStyle: {
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: this.circleColor.sub,
                  },
                },
              },
            },
            {
              value: this.overallCount - this.completedCount,
              name: 'NA',
              itemStyle: {
                normal: {
                  color: this.circleColor.sub,
                },
              },
            },
          ],
          itemStyle: {
            normal: {
              color: this.circleColor.main,
              shadowColor: this.circleColor.main,
              shadowBlur: 0,
              label: {
                show: false,
              },
              labelLine: {
                show: false,
              },
            },
            emphasis: {
              // shadowBlur: 10,
              // shadowOffsetX: 0,
              // shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
  }
}
