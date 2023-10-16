import { Component } from '@angular/core';

@Component({
  selector: 'app-settle-cashback-requests',
  templateUrl: './settle-cashback-requests.component.html',
  styleUrls: ['./settle-cashback-requests.component.scss']
})
export class SettleCashbackRequestsComponent {
  storeName: string = 'ABCD';
  billAmount: Number = 1250;
  billNumber: Number = 1;
  gstNumber: Number = 1234567789043;
  productName: string = 'CDEF';
  productCode: string = 'ABCd023A';

  displayStyle = "none";
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

  images = [
    { image: '/assets/images/products/product.jpg', title: 'Product Photo' },
    { image: '/assets/images/products/serailnumber.png', title: 'Product Serial Number' },
    { image: '/assets/images/products/sidePhoto.jpg', title: 'Product Side Photo' }
  ];
  constructor() { }

  ngOnInit(): void {
  }

  openPopup(color: any) {

    this.displayStyle = "block";
  }

  closePopup() {
    this.displayStyle = "none";
  }

}
