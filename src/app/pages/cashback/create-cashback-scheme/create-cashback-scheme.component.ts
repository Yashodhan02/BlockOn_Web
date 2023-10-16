import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTreeFlatDataSource } from '@angular/material/tree';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';

import { NumberToWordsPipe } from '../../numberToWords.pipe';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from 'ngx-qrcode2';
import { GlobalDataService } from 'src/app/services/global-data.service';
import { ApiService } from 'src/app/services/api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-create-cashback-scheme',
  templateUrl: './create-cashback-scheme.component.html',
  styleUrls: ['./create-cashback-scheme.component.scss']
})
export class CreateCashbackSchemeComponent {
  userData: any;
  errorMessage:any;

  currentStep: number = 1;
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value = 'Campaingn=1';
  value1 = '';
  selectedValue: string = '0'
  steps = [
    { number: 1},
    { number: 2},
    { number: 3 },
    { number: 4},
    { number: 5},
    { number: 6},
    { number: 7},
    // { number: 7, name: 'Select Template ' },
  ];

  schemes: any[] = [
    { name: 'Scheme Name A', backgroundColor: '#d3ffd6' },
    { name: 'Scheme Name B', backgroundColor: '#f9decc' },
    { name: 'Scheme Name C', backgroundColor: '#b9e8ff' },
    { name: 'Scheme Name D', backgroundColor: '#d3ffd6' },
  ];
  Campaingns = [
    { value: '1', viewValue: 'Campaingn Source A' },
    { value: '2', viewValue: 'Campaingn Source B' },
    { value: '3', viewValue: 'Campaingn Source C' },
  ];
  selectedBackgroundColor: string;
  displayStyle = "none";
  displayQRblock = "none";



  minDate: string;
  maxDate: string;
  disabled = new FormControl(false);

  schemeName: any;
  cashbackAmount: any;
  noOfBlock: any;
  expiryDate: Date;
  billValue: any;
  tradable: any;
  // template:any;
  eDate: String;
  CampaingnsQR: any[] = [];

  url: any;
  msg = "";
  imageFile: string= ''     
  safeImageData: any;
  selectedImageId :any= null;
  selectedFile: File;

  safeImageDataList: any = [];
  BrandPhotos: any;
 
  isSecondModalOpen = 'none';
  backgroundColor='#f403d1';
  secondaryColor='#64b5f6'; 
  // backgroundColor='#f403d1';
  // secondaryColor: '#64b5f6';
  textColor='black'
  radioValue: boolean = false; 

  myForm: FormGroup;

  constructor(private fb: FormBuilder, private dateAdapter: DateAdapter<Date>,private globalDataService: GlobalDataService
    , private apiService: ApiService,private router: Router,private http: HttpClient) {
    const currentDate = new Date();
    const nextThreeMonths = new Date();
    nextThreeMonths.setMonth(currentDate.getMonth() + 3);
    this.minDate = currentDate.toISOString().split('T')[0];
    this.maxDate = nextThreeMonths.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.createForm();
    this.userData = this.globalDataService.getUserData(); 
    this.imageFile=this.userData.BrandLogo;
    this.getImageSrc();
    this.getBrandPhotos();

  }

  radioClick(val : any){
    this.radioValue=true;
  }

  openPopup(color: any) {
    this.backgroundColor = color;
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  openCreatePopup() {
    this.displayQRblock = "block";
  }
  closeCreatePopup() {
    this.displayQRblock = "none";
  }

  selectedTemplate: boolean = true;
  allTemplates: boolean = false;

  selectTemplate() {
    this.selectedTemplate = false;
    this.allTemplates = true;
  }

  onBackgroundColorChange(value: string): void {
    this.selectedBackgroundColor = value;

  }

  handleClick(value: number) {
    this.cashbackAmount = value;
  }
  changeNgModeule(value: any) {
    debugger

    this.value1 = 'name=' + this.schemeName + 'Campaingn=' + value

    this.CampaingnsQR.push(this.value1);

    console.log(this.CampaingnsQR);
  }
  createForm(): void {
    this.myForm = this.fb.group({
      schemeName: ['', [Validators.required]],
      cashbackAmount: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      noOfBlock: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      expiryDate: new FormControl(Date, Validators.required),
      billValue: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      tradable: ['', [Validators.required]],
      selectedBackgroundColor: ['', [Validators.required]],

    });
  }

  submitForm(): void {
   
    debugger
      let formData = new FormData()
      formData.append('CorpUserID', this.userData.UserId);
      formData.append('BrandID', this.userData.BrandId);
      formData.append('BrandName', this.userData.BrandName);
      formData.append('BlokCatID', this.safeImageData);
      formData.append('SchemeName', this.schemeName);
      formData.append('CashbackAmount', this.cashbackAmount);
      formData.append('NumberOfBlocks', this.noOfBlock);
      const formattedExpiryDate = format(this.expiryDate, 'yyyy-MM-dd');
      formData.append('ExpiryDate', formattedExpiryDate);
      formData.append('MinimumBillValue', this.billValue);
      formData.append('SchemeOption', this.tradable);
      formData.append('TxtColor', this.textColor);
      formData.append('BgColor', this.backgroundColor);
      formData.append('BgSecondaryColor', this.secondaryColor);
      formData.append('SchemeLogo', this.selectedFile);
      formData.append('ImageId', this.selectedImageId);
     
      this.apiService.InsertBrandCashbackScheme(formData).subscribe(
        (response) => {
          console.log(response);
          if (response.message === 'Success') {
            // Show success SweetAlert
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: 'Your have successfully created Cashback block.',
              confirmButtonText: 'OK'
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['/cashback/view-cashback-block-scheme']);
              }
            });
          } else {
            this.router.navigate(['/authentication/login']);
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

  get today(): string {
    return this.dateAdapter.format(new Date(), 'yyyy-MM-dd');
  }


  nextStep() {
    this.currentStep++;
    console.log(this.expiryDate)
  }

  previousStep() {
    this.currentStep--;
  }

  openSecondModal() {
    this.isSecondModalOpen = 'block';
  }

  closeSecondModal() {
    this.isSecondModalOpen = 'none';
  }

  onImageClick(imageData: any) {
    this.url='';
    this.safeImageData = imageData.imageSrc;
    this.selectedImageId =imageData.id;
    this.isSecondModalOpen = 'none';
  }

  getImageSrc() {
    this.safeImageData = ('data:image/jpeg;base64,' + this.imageFile);
  }

  
  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    const file: File = event.target.files[0];
    if (!file) {
      return;
    }
    const mimeType = file.type;
    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Only images are supported";
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.msg = "";
      this.url = reader.result as string; // Cast to string
    };
    this.isSecondModalOpen = 'none';
  }

  getBrandPhotos() {
    this.apiService.GetBrandPhotos(this.userData.BrandId).subscribe(
      (response) => {
        if (response) {
          this.BrandPhotos = response;
          this.getImageListSrc();
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
  
  getImageListSrc() {
    this.safeImageDataList = []; // Clear the list if needed
    for (const imageFile of this.BrandPhotos) {
      const base64Image = 'data:image/jpeg;base64,' + imageFile.Photo;
      this.safeImageDataList.push({ id: imageFile.ID, imageSrc: base64Image });
    }
  }
}
