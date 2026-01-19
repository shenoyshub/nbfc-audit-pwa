import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';


import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartOptions, ChartType } from 'chart.js';


import { LeftsidebarComponent } from "../leftsidebar/leftsidebar.component";
@Component({
  selector: 'app-auditdashboard',
  templateUrl: './auditdashboard.component.html',
  styleUrls: ['./auditdashboard.component.css'],
  standalone : true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    MatCardModule,
    BaseChartDirective,
    LeftsidebarComponent
],
})
export class AuditdashboardComponent implements OnInit {

  stats = [
    { title: 'Active Audit', value: '$24,500', icon: 'trending_up', color: '#2563eb' },
    { title: 'Completed', value: '1,240', icon: 'check', color: '#10b981 ' },
    { title: 'Pending Tasks', value: '12', icon: 'schedule', color: '#f59e0b' },
    { title: 'Total Rick Findings', value: '45', icon: 'gpp_maybe', color: '#ef4444' },

  ];
  // piechart
    public pieChartType: 'pie' = 'pie';

   public pieChartData: ChartData<'pie'> = {
    labels: ['Compliance', 'Financial', 'Operational', 'Risk'],
    datasets: [{
      data: [30, 25, 35, 10], // Sample percentage or count
      backgroundColor: [
        '#2563eb', // Material Indigo
        '#ef4444', // Material Pink
        '#10b981', // Material Green
        '#f59e0b'  // Material Amber
      ],
    }]
  };
    public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    }
  };

    // bar chart
   public barChartType: 'bar' = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [45, 52, 60, 48, 70, 85],
        label: 'Completed Audits',
        backgroundColor: '#2563eb', // Material Indigo
        hoverBackgroundColor: '#303f9f'
      }
    ]
  };
   public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Number of Audits' }
      }
    },
    plugins: {
      legend: { display: true, position: 'top' },
      title: { display: false }
    }
  };
// line chart
// public lineChartType: 'line' = 'line';
//  public lineChartData: ChartConfiguration<'line'>['data'] = {
//     labels: ['Jan', 'Feb', 'Mar'],
//     datasets: [
//       {
//         data: [65, 59, 80],
//         label: 'Series A'
//       }
//     ]
//   };
//    public lineChartOptions: ChartOptions<'line'> = {
//     responsive: true,
//   };
// line chart end

  constructor() { }

  ngOnInit() {
  }

}
