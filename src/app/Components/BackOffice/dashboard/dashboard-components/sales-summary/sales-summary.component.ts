import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Import HttpClient
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexYAxis,
  ApexLegend,
  ApexXAxis,
  ApexTooltip,
  ApexTheme,
  ApexGrid
} from 'ng-apexcharts';

export type salesChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  xaxis: ApexXAxis | any;
  yaxis: ApexYAxis | any;
  stroke: any;
  theme: ApexTheme | any;
  tooltip: ApexTooltip | any;
  dataLabels: ApexDataLabels | any;
  legend: ApexLegend | any;
  colors: string[] | any;
  markers: any;
  grid: ApexGrid | any;
};

@Component({
  selector: 'app-sales-summary',
  templateUrl: './sales-summary.component.html',
  standalone: false
})
export class SalesSummaryComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent = Object.create(null);
  public salesChartOptions: Partial<salesChartOptions>;

  constructor(private http: HttpClient) {
    this.salesChartOptions = {
      series: [],
      chart: {
        fontFamily: 'Nunito Sans,sans-serif',
        height: 250,
        type: 'area',
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 1,
      },
      grid: {
        strokeDashArray: 3,
      },
      xaxis: {
        categories: []
      },
      tooltip: {
        theme: 'dark'
      },
      legend: {
        show: false
      }
    };
  }

  ngOnInit(): void {
    this.getSalesData();  // Fetch sales data on component load
  }

  getSalesData(): void {
    this.http.get<any>('http://localhost:8089/examen/Admin/revenue/monthly')
      .subscribe({
        next: (data) => {
          this.updateChartOptions(data);
        },
        error: (err) => {
          console.error('Error fetching sales data', err);
        }
      });
  }

  updateChartOptions(data: any): void {
    // Here, you directly map the received data to the chart
    const revenueData = Object.values(data);  // All revenue values (e.g., 0 for months with no revenue)
    const months = Object.keys(data);  // All months from the response (e.g., JANUARY, FEBRUARY, etc.)

    this.salesChartOptions.series = [{
      name: 'Monthly Revenue',
      data: revenueData
    }];

    this.salesChartOptions.xaxis.categories = months;  // Set months as x-axis categories
  }
}
