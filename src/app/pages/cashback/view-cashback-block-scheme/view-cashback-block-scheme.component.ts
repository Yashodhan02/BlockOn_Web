import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from 'ngx-qrcode2';
import { ApiService } from 'src/app/services/api.service';
import { GlobalDataService } from 'src/app/services/global-data.service';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-view-cashback-block-scheme',
  templateUrl: './view-cashback-block-scheme.component.html',
  styleUrls: ['./view-cashback-block-scheme.component.scss']
})
export class ViewCashbackBlockSchemeComponent {

  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value = '';

  userData: any;
 
 AllSchemes :any;
 SchemeDetail:any;
 SchemeBlocksDetail: any;


  excelList: any = [];

  schemeNameChecked: boolean = false;
  discountAmountChecked: boolean = false;
  billValueChecked: boolean = false;
  expiryDateChecked: boolean = false;
  displayStyle: string = "none";
  displayStyleForScheme: string = "none";

  constructor(private apiService: ApiService,private globalDataService: GlobalDataService) { }

  ngOnInit(): void {
    this.userData = this.globalDataService.getUserData();
    this.getBrandCashbackBloksByBrandID();
  }


  getBrandCashbackBloksByBrandID(){
    this.apiService.getBrandCashbackBloksByBrandID(this.userData.BrandId).subscribe(
      (response) => {
        console.log(response);
        if (response && Array.isArray(response)) {
          this.AllSchemes = response;
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

  imageFile: string= '' 
  safeImageData :any;
  getBrandCashBackBlocksBySchemeID(SchemeId :any){
    this.apiService.getBrandCashBackBlocksBySchemeID(this.userData.BrandId,SchemeId).subscribe(
      (response) => {
        console.log(response);
        if (response && Array.isArray(response)) {
          this.SchemeDetail = response;
          this.imageFile = this.SchemeDetail[0].BrandLogo
          this.getImageSrc();
          // this.value ='SchemeId=' this.SchemeDetail.SchemeID + this.userData.BrandId;
          this.value = 'SchemeId=' + this.SchemeDetail[0].SchemeID+ ',' + 'BrandId=' + this.userData.BrandId;
          console.log(this.SchemeDetail);
         
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
  getImageSrc() {
    this.safeImageData = ('data:image/jpeg;base64,' + this.imageFile);
  }


  ExportBrandSchemeDiscountBlok(SchemeId:any){
    this.apiService.ExportBrandSchemeDiscountBlok(this.userData.BrandId,SchemeId).subscribe(
      (response) => {
        console.log(response);
        if (response && Array.isArray(response)) {
          this.SchemeBlocksDetail = response;
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

  openPopupForScheme(schemeId:any) {
    this.isModalOpen = true;
    this.displayStyleForScheme = "block";
    this.getBrandCashBackBlocksBySchemeID(schemeId);
  }

  closePopupForScheme() {
    this.isModalOpen = false;
    this.displayStyleForScheme = "none";
  }
  isModalOpen: boolean = false;

  openPopup(schemeId:any) {
   
    this.displayStyle = "block";
    this.ExportBrandSchemeDiscountBlok(schemeId)
  }
  closePopup() {
  
    this.displayStyle = "none";
  }

  savedData(buffer: any, fileName: string) {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url: string = window.URL.createObjectURL(data);
    const link: HTMLAnchorElement = document.createElement('a');
    link.href = url;
    link.download = fileName + '.xlsx';
    link.click();
  }

  updateExcelList() {
    this.excelList = [];
    for (const scheme of this.SchemeBlocksDetail) {
      const item: any = {};
      item.BlockId = scheme.BlokNumber;
      item.VoucherNo=scheme.VoucherNo
      item.schemeId = scheme.SchemeID;
      if (this.schemeNameChecked) {
        item.SchemeName = scheme.SchemeName;
      }
      if (this.discountAmountChecked) {
        item.DiscountAmount = scheme.DiscountAmount;
      }
      if (this.billValueChecked) {
        item.BillValue = scheme.MinimumBillValue;
      }
      if (this.expiryDateChecked) {
        item.ExpiryDate = scheme.ExpiryDate;
      }

      if (this.schemeNameChecked || this.discountAmountChecked || this.billValueChecked || this.expiryDateChecked) {
        this.excelList.push(item);
      }
       else{
        this.excelList.push(item);
      }
    }
    this.download();
    this.displayStyle = "none";
    this.unChecked();
  }


  unChecked(){
    this.schemeNameChecked = false;
    this.discountAmountChecked = false;
    this.billValueChecked = false;
    this.expiryDateChecked = false;
  }
  download() {
    console.log();
    const worksheet = XLSX.utils.json_to_sheet(this.excelList);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.savedData(excelBuffer, 'SchemeData');
  };
  toggleDiscount(scheme: any) {
    scheme.showDiscount = !scheme.showDiscount;
  }




}
