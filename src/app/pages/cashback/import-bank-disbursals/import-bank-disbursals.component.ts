import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-import-bank-disbursals',
  templateUrl: './import-bank-disbursals.component.html',
  styleUrls: ['./import-bank-disbursals.component.scss']
})
export class ImportBankDisbursalsComponent {
  
  searchText:string='';
  schemeList: any[] = [
    { name: 'Batch Number A', balance: 'XXX' },
    { name: 'Batch Number B', balance: 'XXX' },
    { name: 'Batch Number C', balance: 'XXX' },
    { name: 'Batch Number D', balance: 'XXX' },
    { name: 'Batch Number E', balance: 'XXX' },
    { name: 'Batch Number F', balance: 'XXX' },
    { name: 'Batch Number G', balance: 'XXX' },
    { name: 'Batch Number H', balance: 'XXX' },
  ];


  pagedSchemeList: any[] = [];
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 20];
  currentPageIndex = 0;

 
  constructor() {
    
    this.updatePagedSchemeList();
  }
  ngOnInit(): void {
   

  }

  onPageChange(event: PageEvent) {
    this.currentPageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedSchemeList();
  }

  updatePagedSchemeList() {
    const startIndex = this.currentPageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedSchemeList = this.schemeList.slice(startIndex, endIndex);
  }

}
