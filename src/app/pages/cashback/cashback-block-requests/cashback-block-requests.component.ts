import { Component } from '@angular/core';

@Component({
  selector: 'app-cashback-block-requests',
  templateUrl: './cashback-block-requests.component.html',
  styleUrls: ['./cashback-block-requests.component.scss']
})
export class CashbackBlockRequestsComponent {

  schemes = [
    {
      name: 'Scheme Name A',
      customers: [
        { name: 'Customer 1', id: 'C001' },
        { name: 'Customer 2', id: 'C002' },
        { name: 'Customer 3', id: 'C003' },
        { name: 'Customer 4', id: 'C004' }
      ]
    },
    {
      name: 'Scheme Name B',
      customers: [
        { name: 'Customer 4', id: 'C004' },
        { name: 'Customer 5', id: 'C005' },
        { name: 'Customer 6', id: 'C006' }
      ]
    }
  ];
}








