declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module 'vue-echarts/components/ECharts' {
  const ECharts: any;
  export default ECharts;
}
