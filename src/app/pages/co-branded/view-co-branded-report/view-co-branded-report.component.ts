import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-view-co-branded-report',
  templateUrl: './view-co-branded-report.component.html',
  styleUrls: ['./view-co-branded-report.component.scss']
})
export class ViewCoBrandedReportComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: MatTableDataSource<any>;

  searchText:string='';

  tableData: any[] = [
    { id: 1, name: 'Store 1', storetype: 'Own store', issued: 25 ,distributed:3,redeemed:2},
    { id: 2, name: 'Store 2', storetype: 'Partner store', issued: 30 ,distributed:11 ,redeemed:8},
    { id: 3, name: 'Store 3', storetype: 'Partner store', issued: 40,distributed:8,redeemed:5 },
    // Add more data as needed
  ];
  schemeList: any[] = [
    { name: 'Scheme Name A', balance: 'XXX' },
    { name: 'Scheme Name B', balance: 'XXX' },
    { name: 'Scheme Name C', balance: 'XXX' },
    { name: 'Scheme Name D', balance: 'XXX' },
    { name: 'Scheme Name E', balance: 'XXX' },
    { name: 'Scheme Name F', balance: 'XXX' },
    { name: 'Scheme Name G', balance: 'XXX' },
    { name: 'Scheme Name H', balance: 'XXX' },
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


  getTotal(column: string): number {
    let total = 0;
    for (const row of this.tableData) {
      total += row[column];
    }
    return total;
  }
}
