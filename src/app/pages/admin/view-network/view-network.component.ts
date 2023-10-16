import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { GlobalDataService } from 'src/app/services/global-data.service';

@Component({
  selector: 'app-view-network',
  templateUrl: './view-network.component.html',
  styleUrls: ['./view-network.component.scss']
})
export class ViewNetworkComponent {
  isChecked :boolean;
  stores = [
    { name: 'Store1' },
    { name: 'Store2' },
    { name: 'Store3' },
    { name: 'Store4' },
    { name: 'Store5' },
    { name: 'Store6' },
    { name: 'Store7' },
    { name: 'Store8' },
    { name: 'Store9' }
  ];

  AllStores: any[] = [];
  partner_stores: any[] = [];
  own_stores: any[] = [];

  searchText: string = '';
  searchText1: string = '';

  pagedOwnStoresList: any[] = [];
  pagedPartnerStoresList: any[] = [];
  pageSize = 8;
  pageSizeOptions: number[] = [5, 10, 20];
  currentPageIndex = 0;


  userData: any;
  constructor(private apiService: ApiService, private globalDataService: GlobalDataService,private router: Router) {
 
  }
  ngOnInit(): void {
    this.userData = this.globalDataService.getUserData();
    this.GetCorporateOwnOrPartnerStoreByCorpUserID();
  }

  GetCorporateOwnOrPartnerStoreByCorpUserID() {
    this.apiService.GetCorporateOwnOrPartnerStoreByCorpUserID(this.userData.UserId).subscribe(
      (response) => {
        console.log(response);
        if (response && Array.isArray(response)) {
          this.AllStores = response;
          // this.partner_stores = this.AllStores.filter(store => store["IsPartner"] === 1);
          // this.own_stores = this.AllStores.filter(store => store["IsBrand"] === 1);
          this.partner_stores = this.AllStores.filter(store => store["StoreType"] === 48);
          this.own_stores = this.AllStores.filter(store => store["StoreType"] === 49);
          console.log(this.partner_stores)
          console.log(this.own_stores)
           this.updateStoresListForOwnStores();
           this.updateStoresListForPartnerStores();
        } else {
          // Handle the case where the response is not as expected
          console.error('Invalid response:', response);
        }
      },
      (error) => {
        // Handle errors here
        if (error.error && error.error.error) {
          console.error(error.error.error);
          // this.errorMessage = error.error.error;  // Display the error message
        } else {
          console.error('An error occurred:', error);
        }
      }
    );
  }


  
  onPageChangeForOwnStores(event: PageEvent) {
    this.currentPageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateStoresListForOwnStores();
  }

  onPageChangeForPartnerStores(event: PageEvent) {
    this.currentPageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateStoresListForPartnerStores();
  }

  updateStoresListForOwnStores() {
    const startIndex = this.currentPageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedOwnStoresList = this.own_stores.slice(startIndex, endIndex);
    console.log(this.pagedOwnStoresList)
  }

  updateStoresListForPartnerStores() {
    const startIndex = this.currentPageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedPartnerStoresList = this.partner_stores.slice(startIndex, endIndex);
    console.log(this.pagedPartnerStoresList)
  }

}
