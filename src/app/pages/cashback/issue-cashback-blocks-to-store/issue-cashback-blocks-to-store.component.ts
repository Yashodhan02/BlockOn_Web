
import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { GlobalDataService } from 'src/app/services/global-data.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-issue-cashback-blocks-to-store',
  templateUrl: './issue-cashback-blocks-to-store.component.html',
  styleUrls: ['./issue-cashback-blocks-to-store.component.scss']
})
export class IssueCashbackBlocksToStoreComponent {
  selectedSchemeId: number;
  selectedStoresWithBlocks: { storeId: number; blockValue: number }[] = [];


  searchText: string = '';
  searchText1: string = '';

  AllSchemes: any;
  AllStores: any[] = [];


  // blocks = [50, 100, 200, 500, 1000];
  blocks = [2, 4, 6, 8, 10];
  partner_stores: any[] = [];
  own_stores: any[] = [];

  pagedSchemeList: any[] = [];
  pagedStoresList: any[] = [];

  pagedOwnStoresList: any[] = [];
  pagedPartnerStoresList: any[] = [];
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 20];
  currentPageIndex = 0;

  userData: any;
  constructor(private apiService: ApiService, private globalDataService: GlobalDataService,private router: Router) {
    // this.AllStores = this.AllStores.map(store => ({
    //   ...store,
    //   blocks: [...this.blocks]
    // }));
    // console.log(this.AllStores )

  }
  ngOnInit(): void {
    this.userData = this.globalDataService.getUserData();
    this.getBrandCashbackBloksByBrandID();
    this.GetCorporateOwnOrPartnerStoreByCorpUserID();
    // console.log(this.);
    console.log(this.pagedStoresList)

  }


  getBrandCashbackBloksByBrandID() {
    this.apiService.getBrandCashbackBloksByBrandID(this.userData.BrandId).subscribe(
      (response) => {
        console.log(response);
        if (response && Array.isArray(response)) {
          this.AllSchemes = response;
          this.updatePagedSchemeList();
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
        console.log(response);
        if (response && Array.isArray(response)) {
          this.AllStores = response;
          this.AllStores = this.AllStores.map(store => ({
            ...store,
            blocks: [...this.blocks]
          }));

          this.partner_stores = this.AllStores.filter(store => store["IsPartner"] === 1);
          this.own_stores = this.AllStores.filter(store => store["IsBrand"] === 1);
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


  onPageChange(event: PageEvent) {
    this.currentPageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedSchemeList();
  }

  updatePagedSchemeList() {
    const startIndex = this.currentPageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedSchemeList = this.AllSchemes.slice(startIndex, endIndex);
    // this.pagedSchemeList = this.schemeList.slice(startIndex, endIndex);
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


  hasSelectedOwnStores(): boolean {
    return this.pagedOwnStoresList.some(store => store.selected);
  }

  hasSelectedOwnStoresBlocks(): boolean {
    return this.pagedOwnStoresList.some(store => store.selectedBlocks !== null);
  }

  hasSelectedPartnerStores(): boolean {
    return this.pagedPartnerStoresList.some(store => store.selected);
  }

  hasSelectedPartnerBlocks(): boolean {
    return this.pagedPartnerStoresList.some(store => store.selectedBlocks !== null);
  }

  submitAndDistributeToOwnStore() {
    const selectedStores = this.pagedOwnStoresList.filter(store => store.selected === true);
    const selectedStoreDetails = selectedStores.map(store => {
      return {
        storeId: store.StoreID,
        selectedBlocks: store.selectedBlocks
      };
    });

    const requestData = {
      SchemeID: this.selectedSchemeId,
      StoreIdsWithBlocks: selectedStoreDetails,
      UserId: this.userData.UserId,
      BrandId: this.userData.BrandId,
    };

    this.apiService.issueCashbackBlocksToStore(requestData).subscribe(
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
            this.router.navigate(['/cashback/view-cashback-block-scheme']);
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

  errorMessage :any;
  submitAndDistributeToPartnerStore() {
    const selectedStores = this.pagedPartnerStoresList.filter(store => store.selected === true);
    const selectedStoreDetails = selectedStores.map(store => {
      return {
        storeId: store.StoreID,
        selectedBlocks: store.selectedBlocks
      };
    });

    const requestData = {
      SchemeID: this.selectedSchemeId,
      StoreIdsWithBlocks: selectedStoreDetails,
      UserId: this.userData.UserId,
      BrandId: this.userData.BrandId,
    };

    this.apiService.issueCashbackBlocksToStore(requestData).subscribe(
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
          this.router.navigate(['/cashback/view-cashback-block-scheme']);
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



  // toggleSelection(store: any) {
  //   store.storeId = !store.storeId;

  //   if (store.storeId) {
  //     this.selectedStoresWithBlocks.push({ storeId: store.storeId, blockValue: store.blocks });
  //   } else {
  //     const index = this.selectedStoresWithBlocks.findIndex(selectedStore => selectedStore.storeId === store.storeId);
  //     if (index !== -1) {
  //       this.selectedStoresWithBlocks.splice(index, 1);
  //     }
  //   }
  // }




  toggleSelectionForOwnStores() {
    const selectedStores = this.pagedOwnStoresList.filter(store => store.selected === true);
    const selectedOwnStoreDetails = selectedStores.map(store => {
      return {
        storeId: store.StoreID,
        selectedBlocks: store.selectedBlocks,
        selected: store.selected
      };
    });
    console.log(selectedOwnStoreDetails);
  }

  toggleSelectionForPartnerStores() {
    const selectedStores = this.pagedPartnerStoresList.filter(store => store.selected === true);
    const selectedStorePartnerDetails = selectedStores.map(store => {
      return {
        storeId: store.StoreID,
        selectedBlocks: store.selectedBlocks,
        selected: store.selected
      };
    });
    console.log(selectedStorePartnerDetails);
  }

  BalanceBlocks: any;
  noOfBlocksCount(val: any) {
    this.BalanceBlocks = val
  }
  selectedBlocksList: { storeId: number, selectedBlocks: number }[] = [];


  updateBalance(store: any) {
    const selectedBlockValue = parseInt(store.selectedBlocks, 10); // Convert selected blocks to a number
    const index = this.selectedBlocksList.findIndex(item => item.storeId === store.StoreID);
    if (index === -1) {
      this.selectedBlocksList.push({ storeId: store.StoreID, selectedBlocks: selectedBlockValue });
    } else {
      this.BalanceBlocks = this.BalanceBlocks + this.selectedBlocksList[index].selectedBlocks
      this.selectedBlocksList[index].selectedBlocks = selectedBlockValue;
    }

    if (!isNaN(selectedBlockValue)) {
      // Check if the updated balance is enough for the selected blocks
      if (this.BalanceBlocks >= selectedBlockValue) {
        // Update the store's selected blocks
        store.selectedBlocks = selectedBlockValue;

        // Update the BalanceBlocks
        this.BalanceBlocks -= selectedBlockValue;
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Insufficient Balance',
          text: 'BalanceBlocks are not enough for distribution',
          confirmButtonText: 'OK'
        })
        .then(() => {
          // Reset the selected blocks to the previous value
          // store.selectedBlocks = this.selectedBlocksList[index].selectedBlocks;
          // // Update the BalanceBlocks accordingly
          // this.BalanceBlocks += this.selectedBlocksList[index].selectedBlocks;
        });
      }
    }
  }
}
