import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { GlobalDataService } from 'src/app/services/global-data.service';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-issue-blocks-to-store',
  templateUrl: './issue-blocks-to-store.component.html',
  styleUrls: ['./issue-blocks-to-store.component.scss'],

})
export class IssueBlocksToStoreComponent {
  selectedSchemeId: number;
  selectedStoresWithBlocks: { storeId: number; blockValue: number }[] = [];


  searchText: string = '';
  searchTextForPartnerStore: string = '';

  noOfBlocks: any = '';


  pageSizeOptions: number[] = [5, 10, 20];

  userData: any;

  BalanceBlocks: any ;
  remaningBlocks: any ;
  AllSchemes: any[]=[];
  AllStores: any[] = [];
  own_stores: any[] = [];
  partner_stores: any[] = [];

//Scheme
currentPageSchemes: number = 1; 
pageSize = 32;
  //Own Stores
  searchTextByCityForOwn: string = '';
  searchTextByAreaForOwn: string = '';
  originalOwnStores: any[] = [];
  originalOwnStoresByCity: any[] = [];
  selectAll: boolean = false;
  pageOwnSize: number = 10; 
  currentPageOwnStores: number = 1; 
  IsSumitOwnStore : boolean = false;

   //Partner Stores
   searchTextByCityForPartner: string = '';
  searchTextByAreaForPartner: string = '';
  originalPartnerStores: any[] = [];
  originalPartnerStoresByCity: any[] = [];
  selectAllForPartnerStore: boolean = false;
  pagePartnerSize: number = 10;
  currentPagePartnerStores: number = 1;
  IsSumitPartnerStore : boolean = false;

  constructor(private apiService: ApiService, private globalDataService: GlobalDataService, private router: Router) {

  }
  ngOnInit(): void {
    this.userData = this.globalDataService.getUserData();
    this.getBrandDiscountBlocksByBrandID();
    this.GetCorporateOwnOrPartnerStoreByCorpUserID();
  }


  getBrandDiscountBlocksByBrandID() {
    this.apiService.getBrandDiscountBlocksByBrandID(this.userData.BrandId).subscribe(
      (response) => {
        console.log(response);
        if (response && Array.isArray(response)) {
          this.AllSchemes = response;
         
          // this.updatePagedSchemeList();
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

  GetCorporateOwnOrPartnerStoreByCorpUserID() {
    this.apiService.GetCorporateOwnOrPartnerStoreByCorpUserID(this.userData.UserId).subscribe(
      (response) => {
        // console.log(response);
        if (response && Array.isArray(response)) {
          this.AllStores = response;
          // this.partner_stores = this.AllStores.filter(store => store["IsPartner"] === 1);
          // this.own_stores = this.AllStores.filter(store => store["IsBrand"] === 1);
          this.partner_stores = this.AllStores.filter(store => store["StoreType"] === 48);
          this.own_stores = this.AllStores.filter(store => store["StoreType"] === 49);
          this.originalOwnStores = this.own_stores;
          this.originalPartnerStores =this.partner_stores
          console.log(this.partner_stores)
          console.log(this.own_stores)

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



  pageChangedAllSchemes(newPage: number) {
    this.currentPageSchemes = newPage;
  }

  //Scheme Store
  prevPageScheme() {
    if (this.currentPageSchemes > 1) {
      this.currentPageSchemes--;
    }
  }
  nextPageScheme() {
    if (this.currentPageSchemes < this.totalPagesScheme) {
      this.currentPageSchemes++;
    }
  }

  get totalPagesScheme(): number {
    return Math.ceil(this.AllSchemes.length / this.pageSize);
  }

//own store
  prevPageOwn() {
    if (this.currentPageOwnStores > 1) {
      this.currentPageOwnStores--;
    }
  }
  nextPageOwn() {
    if (this.currentPageOwnStores < this.totalPagesOwn) {
      this.currentPageOwnStores++;
    }
  }
  get totalPagesOwn(): number {
    return Math.ceil(this.own_stores.length / this.pageOwnSize);
  }

  //Partner Store
  prevPagePartner() {
    if (this.currentPagePartnerStores > 1) {
      this.currentPagePartnerStores--;
    }
  }
  nextPagePartner() {
    if (this.currentPagePartnerStores < this.totalPagespartner) {
      this.currentPagePartnerStores++;
    }
  }

  get totalPagespartner(): number {
    return Math.ceil(this.partner_stores.length / this.pagePartnerSize);
  }

  submitAndDistributeToOwnStore() {
    const selectedStores = this.own_stores.filter(store => store.selected === true);
    const selectedStoreDetails = selectedStores.map(store => {
      return {
        storeId: store.StoreID,
        selectedBlocks: store.noOfBlocks
      };
    });

    const requestData = {
      SchemeID: this.selectedSchemeId,
      StoreIdsWithBlocks: selectedStoreDetails,
      UserId: this.userData.UserId,
      BrandId: this.userData.BrandId,
    };

    this.apiService.issueBlocksToStore(requestData).subscribe(
      (response) => {
        console.log(response);
        if (response.message === 'Success') {
          // Show success SweetAlert
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'You have successfully transfer a block to Stores',
            confirmButtonText: 'OK'
          }).then((result) => {
            this.router.navigate(['/admin/view-blockon-scheme']);
          });
        }
      },
      (error) => {
        // Handle errors here
        if (error.error && error.error.error) {
          console.error(error.error.error);
          this.errorMessage = error.error.error; // Display the error message
          // Show error SweetAlert
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: this.errorMessage,
            confirmButtonText: 'OK'
          });
        } else {
          console.error('An error occurred:', error);
        }
      }
    );
  }

  errorMessage: any;
  submitAndDistributeToPartnerStore() {
    const selectedStores = this.partner_stores.filter(store => store.selected === true);
    const selectedStoreDetails = selectedStores.map(store => {
      return {
        storeId: store.StoreID,
        selectedBlocks: store.noOfBlocks
      };
    });

    const requestData = {
      SchemeID: this.selectedSchemeId,
      StoreIdsWithBlocks: selectedStoreDetails,
      UserId: this.userData.UserId,
      BrandId: this.userData.BrandId,
    };

    this.apiService.issueBlocksToStore(requestData).subscribe(
      (response) => {
        console.log(response);
        if (response.message === 'Success') {
          // Show success SweetAlert
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'You have successfully transfer a block to Stores',
            confirmButtonText: 'OK'
          }).then((result) => {
            this.router.navigate(['/admin/view-blockon-scheme']);
          });
        }
      },
      (error) => {
        // Handle errors here
        if (error.error && error.error.error) {
          console.error(error.error.error);
          this.errorMessage = error.error.error; // Display the error message
          // Show error SweetAlert
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: this.errorMessage,
            confirmButtonText: 'OK'
          });
        } else {
          console.error('An error occurred:', error);
        }
      }
    );
  }

  filterOwnStoresByCity(event: any) {
    const searchTextByCity = event.target.value.toLowerCase().trim();
    if (searchTextByCity === '') {
      this.own_stores = this.originalOwnStores.slice();
    } else {
      this.own_stores = this.originalOwnStores.filter(store => {
        return !event.target.value || store.StoreAddress1.toLocaleLowerCase().trim().startsWith(event.target.value.toLocaleLowerCase().trim());
      });
      this.originalOwnStoresByCity = this.own_stores
    }
  }

  filterOwnStoresByArea(event: any) {
    const searchTextByArea = event.target.value.toLowerCase().trim();
    if (searchTextByArea === '') {
      this.own_stores = this.originalOwnStoresByCity
    } else {
      this.own_stores = this.own_stores.filter(store => {
        return !event.target.value || store.StoreAddress.toLocaleLowerCase().trim().startsWith(event.target.value.toLocaleLowerCase().trim());
      });
    }
  }


  toggleSelectAllForOwnStores() {
    const list = this.own_stores
    for (const store of list) {
      store.selected = this.selectAll;
      if (this.selectAll) {
        store.noOfBlocks = this.noOfBlocks;
      }
    }
    if (!this.selectAll) {
      this.IsSumitOwnStore = false;
      this.noOfBlocks = ''
      const list = this.own_stores;
      for (const store of list) {
        store.selected = this.selectAll;
        store.noOfBlocks = '';
      }
      this.remaningBlocks= this.BalanceBlocks
    }
  
  }

  toggleSelectForOwnStores() {
    for (const store of this.own_stores) {
      store.selected
      if (store.selected) {
        store.noOfBlocks = store.noOfBlocks;
      }
      if (!store.selected) {
        store.noOfBlocks = '';
      }
    }
    const selectedStores = this.own_stores.filter(store => store.selected === true);
    const sumOfBlocks = selectedStores.reduce((sum, store) => sum + parseInt(store.noOfBlocks || 0, 10), 0);
    this.remaningBlocks=this.BalanceBlocks -sumOfBlocks
   
   
  }

  noOfBlocksCount(val: any) {
    this.BalanceBlocks = val
    this.remaningBlocks =this.BalanceBlocks
  }

  updateNoOfBlocksForOwnStoreAll(event: any) {
    for (const store of this.own_stores) {
      if (store.selected) {
        store.noOfBlocks = event.target.value;
      }
    }
    const selectedStores = this.own_stores.filter(store => store.selected === true);
    const sumOfBlocks = selectedStores.reduce((sum, store) => sum + parseInt(store.noOfBlocks || 0, 10), 0);
    if (sumOfBlocks > this.BalanceBlocks) {
      this.remaningBlocks=this.BalanceBlocks 

      Swal.fire({
        icon: 'error',
        title: 'Insufficient Balance',
        text: this.remaningBlocks  + ' '+ 'BalanceBlocks are not enough for distribution',
        confirmButtonText: 'OK'
      })
      for (const store of this.own_stores) {
        if (store.selected) {
          store.noOfBlocks = '';
        }
      }
      this.IsSumitOwnStore = false;
    }
    else{
      this.remaningBlocks=this.BalanceBlocks -sumOfBlocks
      this.IsSumitOwnStore = true;
    }
   
  }

  updateNoOfBlockForOwnStore() {
    const selectedStores = this.own_stores.filter(store => store.selected === true);
    const sumOfBlocks = selectedStores.reduce((sum, store) => sum + parseInt(store.noOfBlocks || 0, 10), 0);

    if (sumOfBlocks > this.BalanceBlocks) {
      Swal.fire({
        icon: 'error',
        title: 'Insufficient Balance',
        text: this.remaningBlocks  + ' '+ 'BalanceBlocks are not enough for distribution',
        confirmButtonText: 'OK'
        
      })
      this.IsSumitOwnStore = false;
    }
    else{
      this.remaningBlocks = this.BalanceBlocks -sumOfBlocks
      this.IsSumitOwnStore = true;
    }
  
  }

  filterPartnerStoresByCity(event: any) {
    const searchTextByCity = event.target.value.toLowerCase().trim();
    if (searchTextByCity === '') {
      this.partner_stores = this.originalPartnerStores.slice();
    } else {
      this.partner_stores = this.originalPartnerStores.filter(store => {
        return !event.target.value || store.StoreAddress1.toLocaleLowerCase().trim().startsWith(event.target.value.toLocaleLowerCase().trim());
      });
      this.originalPartnerStoresByCity = this.own_stores
    }
  }

  filterPartnerStoresByArea(event: any) {
    const searchTextByArea = event.target.value.toLowerCase().trim();
    if (searchTextByArea === '') {
      this.partner_stores = this.originalPartnerStoresByCity
    } else {
      this.partner_stores = this.partner_stores.filter(store => {
        return !event.target.value || store.StoreAddress.toLocaleLowerCase().trim().startsWith(event.target.value.toLocaleLowerCase().trim());
      });
    }
  }

  toggleSelectAllForPartnerStore() {
    const list = this.partner_stores
    for (const store of list) {
      store.selected = this.selectAllForPartnerStore;
      if (this.selectAllForPartnerStore) {
        store.noOfBlocks = this.noOfBlocks;
      }
    }
    if (!this.selectAllForPartnerStore) {
      this.noOfBlocks = '';
      const list = this.partner_stores;
      for (const store of list) {
        store.selected = this.selectAllForPartnerStore;
        store.noOfBlocks = '';
      }
    }
    this.remaningBlocks= this.BalanceBlocks
  }

  toggleSelectForPartnerStores() {
    for (const store of this.partner_stores) {
      store.selected
      if (store.selected) {
        store.noOfBlocks = store.noOfBlocks;
      }
      if (!store.selected) {
        
        store.noOfBlocks = '';
      }
    }
    const selectedStores = this.partner_stores.filter(store => store.selected === true);
    const sumOfBlocks = selectedStores.reduce((sum, store) => sum + parseInt(store.noOfBlocks || 0, 10), 0);

    this.remaningBlocks=this.BalanceBlocks -sumOfBlocks
 
  }

  updateNoOfBlocksForPartnerStoreAll(event: any) {
    for (const store of this.partner_stores) {
      if (store.selected) {
        store.noOfBlocks = event.target.value;
      }
    }
    const selectedStores = this.partner_stores.filter(store => store.selected === true);
    const sumOfBlocks = selectedStores.reduce((sum, store) => sum + parseInt(store.noOfBlocks || 0, 10), 0);

    if (sumOfBlocks > this.BalanceBlocks) {
      this.remaningBlocks =  this.BalanceBlocks 
      Swal.fire({
        icon: 'error',
        title: 'Insufficient Balance',
        text: this.remaningBlocks  + ' '+ 'BalanceBlocks are not enough for distribution',
        confirmButtonText: 'OK'
      })
      this.IsSumitPartnerStore = false;

    }
    else{
      this.remaningBlocks = this.BalanceBlocks -sumOfBlocks
      this.IsSumitPartnerStore = true;
    }

  }

  updateNoOfBlocksForPartnerStore() {
    const selectedStores = this.partner_stores.filter(store => store.selected === true);
    const sumOfBlocks = selectedStores.reduce((sum, store) => sum + parseInt(store.noOfBlocks || 0, 10), 0);

    if (sumOfBlocks > this.BalanceBlocks) {
      Swal.fire({
        icon: 'error',
        title: 'Insufficient Balance' ,
        text: this.remaningBlocks  + 'BalanceBlocks are not enough for distribution',
        confirmButtonText: 'OK'
      })
      this.IsSumitPartnerStore = false;
    }
    else{
      this.remaningBlocks = this.BalanceBlocks -sumOfBlocks
      this.IsSumitPartnerStore = true;
    }
  }

}




