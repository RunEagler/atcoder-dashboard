export abstract class EChartService {
  protected series: any[] = [];
  protected labels: string[] = []; // SN-1,SN-2,...
  protected readonly serialNumberPrefix: string = 'SN';

  public abstract get options(): any;
  public abstract addSeries(chartData: any): void;
  public setSeries(series: any[]) {
    this.series = series;
  }
  public addLabel(serialNumber: number): void {
    this.labels.push(`${this.serialNumberPrefix}-${serialNumber}`);
  }
}
