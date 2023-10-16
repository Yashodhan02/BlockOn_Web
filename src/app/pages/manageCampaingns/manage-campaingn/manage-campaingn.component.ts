import { DatePipe } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from 'ngx-qrcode2';
import { ApiService } from 'src/app/services/api.service';
import { GlobalDataService } from 'src/app/services/global-data.service';

@Component({
  selector: 'app-manage-campaingn',
  templateUrl: './manage-campaingn.component.html',
  styleUrls: ['./manage-campaingn.component.scss']
})
export class ManageCampaingnComponent {
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  id: number;
  camName: string;
  QRvalue = '';
  selectedValue: Number =0;
  selectedScheme :Number=0;
  expiryDate: Date;
  startDate: Date;

  AllSchemes: any;
  campaingnName:any;
  userData: any;


  CampaingnsQR: any = [];
  displayQRblock = "none";
  Campaingns = [
    { value: 1, viewValue: 'Campaingn Source A' },
    { value: 2, viewValue: 'Campaingn Source B' },
    { value: 3, viewValue: 'Campaingn Source C' },
  ];

  schemeName = [
    { value: 1, viewValue: 'Scheme A' },
    { value: 2, viewValue: 'Scheme B' },
    { value: 3, viewValue: 'Scheme C' },
  ];


  qrList: any = [];

  minDate: string;
  maxDate: string;
  endDate: string;
  qrForm: FormGroup;
  constructor(private apiService: ApiService,private globalDataService: GlobalDataService,private fb: FormBuilder, private dateAdapter: DateAdapter<Date>,private sanitizer: DomSanitizer) {
    const currentDate = new Date();
    const nextThreeMonths = new Date();
    nextThreeMonths.setMonth(currentDate.getMonth() + 3);
    this.minDate = currentDate.toISOString().split('T')[0];
    this.maxDate = nextThreeMonths.toISOString().split('T')[0];
  }
  @ViewChild('qrcodeComponent') qrcodeComponent: ElementRef;

  ngOnInit(): void {
    this.QRForm();
    this.userData = this.globalDataService.getUserData();
    this.getBrandCashbackBloksByBrandID();
    this.getLookupValuesByBrandID();

  }

 QRForm(): void {
    this.qrForm = this.fb.group({
      startDate: new FormControl(Date, Validators.required),
      endDate: new FormControl(Date, Validators.required),
      selectedValue: [Number, [Validators.required]],
      selectedScheme: [Number],

    });
  }
  
  // downloadQRCode() {
  //   const qrCodeImage = document.querySelector('ngx-qrcode img') as HTMLImageElement;
  //   const link = document.createElement('a');
  //   link.href = qrCodeImage.src;
  //   link.download = 'qr-code.png'; // Specify the desired file name with extension
  //   link.click();
  // }
  downloadQRCode(qrCodeValue: string) {
    const qrCodeValue1 = document.querySelector('ngx-qrcode img') as HTMLImageElement;
    const link = document.createElement('a');
    link.href = qrCodeValue1.src;
    link.download = 'qr_code.png'; // Set the desired file name here
    link.click();
}


getBrandCashbackBloksByBrandID() {
  this.apiService.getBrandCashbackBloksByBrandID(this.userData.BrandId).subscribe(
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



getLookupValuesByBrandID() {
  this.apiService.getLookupValuesByBaseLookUpID(105).subscribe(
    (response) => {
      console.log(response);
      if (response && Array.isArray(response)) {
        this.campaingnName = response;
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


  resetform(){
    this.qrForm.reset();
    this.QRvalue='';
  }
  openCreatePopup() {
    this.resetform();
    this.displayQRblock = "block";
  }
  closeCreatePopup() {
    this.displayQRblock = "none";
  }

  createQR(id: any) {
    debugger
    const date = new Date(this.startDate);
    const datePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(date, 'dd-MMM-yy');
    const date1 = new Date(this.endDate);
    const formattedDate1 = datePipe.transform(date1, 'dd-MMM-yy');

    this.CampaingnsQR =[];
    this.QRvalue = 'Campaingn=' + id.value + ',' + formattedDate + ',' + formattedDate1;
    this.CampaingnsQR.QR = this.QRvalue;
    this.CampaingnsQR.camName = id.viewValue;
    this.qrList.push(this.CampaingnsQR);
    this.displayQRblock = "none";
    console.log(this.qrList);
  }
}
