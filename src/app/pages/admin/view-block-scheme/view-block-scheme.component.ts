import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from 'ngx-qrcode2';
import { ApiService } from 'src/app/services/api.service';
import { GlobalDataService } from 'src/app/services/global-data.service';
import * as XLSX from 'xlsx'


import { MatTreeFlatDataSource } from '@angular/material/tree';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
@Component({
  selector: 'app-view-block-scheme',
  templateUrl: './view-block-scheme.component.html',
  styleUrls: ['./view-block-scheme.component.scss'],
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(179deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ])
  ]
})
export class ViewBlockSchemeComponent {

  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value = '';

  userData: any;

  AllSchemes: any;
  activeScheme: any[] = [];
  expireScheme: any[] = [];
  pendingSchemes: any[] = [];
  termsAndConditionList: any[] = [];

  SchemeDetail: any;
  SchemeBlocksDetail: any;


  minDate: string;
  maxDate: string;
  expiryDate: Date;
  errorMessage: any;


  excelList: any = [];

  schemeNameChecked: boolean = false;
  discountAmountChecked: boolean = false;
  billValueChecked: boolean = false;
  expiryDateChecked: boolean = false;
  displayStyle: string = "none";
  displayStyleForScheme: string = "none";

  constructor(private apiService: ApiService, private globalDataService: GlobalDataService, private dateAdapter: DateAdapter<Date>) {
    const currentDate = new Date();
    const nextThreeMonths = new Date();
    nextThreeMonths.setMonth(currentDate.getMonth() + 3);
    this.minDate = currentDate.toISOString().split('T')[0];
    this.maxDate = nextThreeMonths.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.userData = this.globalDataService.getUserData();
    this.getBrandDiscountBlocksByBrandID();
    this.GetBrandPendingBloksByBrandIDAndBlockCatID();
  }


  getBrandDiscountBlocksByBrandID() {
    this.apiService.getBrandDiscountBlocksByBrandID(this.userData.BrandId).subscribe(
      (response) => {
        if (response && Array.isArray(response)) {
          this.AllSchemes = response;
          for (const item of this.AllSchemes) {
            if (item.ExpiryInDays > 1) {
              this.activeScheme.push(item);
            } else if (item.ExpiryInDays < 0) {
              this.expireScheme.push(item);
            }
          }

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


  GetBrandPendingBloksByBrandIDAndBlockCatID() {
    this.apiService.GetPendingBloksByBrandIDAndBlockCatID(this.userData.BrandId, 1).subscribe(
      (response) => {
        if (response && Array.isArray(response)) {
          this.pendingSchemes = response;
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

  schemeOptionArrayAsNumbers: any = []
  imageFile: string = ''
  safeImageData: any;
  getBrandDiscountBlocksBySchemeID(SchemeId: any) {
    this.apiService.getBrandDiscountBlocksBySchemeID(this.userData.BrandId, SchemeId).subscribe(
      (response) => {
        if (response && Array.isArray(response)) {
          this.SchemeDetail = response;
          const schemeOption = this.SchemeDetail[0].SchemeOption;
          const schemeOptionArray = schemeOption.split(',');
          this.schemeOptionArrayAsNumbers = schemeOptionArray.map(Number);
          this.imageFile = this.SchemeDetail[0].BrandLogo
          this.getImageSrc();
          // this.value ='SchemeId=' this.SchemeDetail.SchemeID + this.userData.BrandId;
          this.value = 'SchemeId=' + this.SchemeDetail[0].SchemeID + ',' + 'BrandId=' + this.userData.BrandId;
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


  ExportBrandSchemeDiscountBlok(SchemeId: any) {
    this.apiService.ExportBrandSchemeDiscountBlok(this.userData.BrandId, SchemeId).subscribe(
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

  openPopupForScheme(schemeId: any) {
    this.isModalOpen = true;
    this.displayStyleForScheme = "block";
    this.getBrandDiscountBlocksBySchemeID(schemeId);
  }

  closePopupForScheme() {
    this.isModalOpen = false;
    this.displayStyleForScheme = "none";
  }
  isModalOpen: boolean = false;

  openPopup(schemeId: any) {

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
      item.VoucherNo = scheme.VoucherNo
      item.SchemeId = scheme.SchemeID;
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
      else {
        this.excelList.push(item);
      }
    }
    this.download();
    this.displayStyle = "none";
    this.unChecked();
  }


  unChecked() {
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


  BlokCatID: any = 1;
  updateDate(schemeId: any): void {
    let formData = new FormData()
    formData.append('CorpUserID', this.userData.UserId);
    formData.append('SchemeID', schemeId);
    formData.append('BlokCatID', this.BlokCatID);
    const formattedExpiryDate = format(this.expiryDate, 'yyyy-MM-dd');
    formData.append('ExpiryDate', formattedExpiryDate);


    this.apiService.UpdateValidityOfBrandSchemeByBlokCatID(formData).subscribe(
      (response) => {
        console.log(response);
        if (response.message === 'Success') {
          // Show success SweetAlert
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Your have successfully Updated Expiry date.',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
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
  displayStyleForTerms: string = 'none';

  // Function to show the T&C modal
  showTermsAndConditionsModal() {
    this.GetBrandTermsAndConditionsBySchemeIDAndBlokCatID();
    this.displayStyleForTerms = 'block';
  }

  // Function to hide the T&C modal
  hideTermsAndConditionsModal() {
    this.displayStyleForTerms = 'none';
  }


  GetBrandTermsAndConditionsBySchemeIDAndBlokCatID() {
    this.apiService.GetTermsAndConditionsBySchemeIDAndBlokCatID(this.userData.BrandId, this.SchemeDetail[0].SchemeID, 1).subscribe(
      (response) => {
        console.log(response);
        if (response && Array.isArray(response)) {
          this.termsAndConditionList = response;
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
}
