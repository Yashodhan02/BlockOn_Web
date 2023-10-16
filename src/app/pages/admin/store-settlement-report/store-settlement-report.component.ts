import { Component } from '@angular/core';

@Component({
  selector: 'app-store-settlement-report',
  templateUrl: './store-settlement-report.component.html',
  styleUrls: ['./store-settlement-report.component.scss']
})
export class StoreSettlementReportComponent {
  months = [
    { value: '1', viewValue: 'January' },
    { value: '2', viewValue: 'February' },
    { value: '3', viewValue: 'March' },
    { value: '4', viewValue: 'April ' },
    { value: '5', viewValue: 'May' },
    { value: '6', viewValue: 'June' },
    { value: '7', viewValue: 'July' },
    { value: '8', viewValue: 'August' },
    { value: '9', viewValue: 'September' },
    { value: '10', viewValue: 'October' },
    { value: '11', viewValue: 'November' },
    { value: '12', viewValue: 'Decmeber' },

  ];

  year = [
    { value: '1', viewValue: '2019' },
    { value: '2', viewValue: '2020' },
    { value: '3', viewValue: '2021' },
    { value: '4', viewValue: '2022 ' },
    { value: '5', viewValue: '2023' },
  ];
  blocks = [
    { value: '1', viewValue: '500' },
    { value: '2', viewValue: '600' },
    { value: '3', viewValue: '700' },
    { value: '4', viewValue: '800 ' },
    { value: '5', viewValue: '900' },
  ];
  constructor() { }
  ngOnInit(): void {
  }

}
