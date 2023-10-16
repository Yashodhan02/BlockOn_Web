import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  selector: 'app-create-blockon-scheme',
  templateUrl: './create-blockon-scheme.component.html',
  styleUrls: ['./create-blockon-scheme.component.scss'],

})
export class CreateBlockonSchemeComponent {
  userData: any;
  errorMessage: any;
  currentStep: number = 1;
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value = '';
  steps = [
    { number: 1, name: 'Scheme Name ' },
    { number: 2, name: 'Discount Amount' },
    { number: 3, name: 'Number Of Blocks ' },
    { number: 4, name: 'Expiry Date ' },
    { number: 5, name: 'Min Bill Value ' },
    { number: 6, name: 'Tradable Or Transferable' },
    { number: 7, name: 'Terms & Condition' },
    { number: 8, name: 'Rate' },
    { number: 9, name: 'Select Template ' },
    { number: 10, name: 'Pyment ' },
  ];

  // -45deg, #f403d1, #64b5f6
  displayStyle = "none";
  isSecondModalOpen = 'none';
  backgroundColor = '#f403d1';
  secondaryColor = '#64b5f6';
  textColor = 'black'
  radioValue: boolean = false;


  minDate: string;
  maxDate: string;
  disabled = new FormControl(false);

  schemeName: string;
  discountAmount: any;
  noOfBlock: any;
  expiryDate: Date;
  billValue: any;
  tradable: any[] = [];
  isTradable: boolean = false;
  isTransferable: boolean = false;
  eDate: String;
  terms: any;
  
  perBlockRate : any;
  inputerId :any =3;

  url: any;
  msg = "";
  imageFile: string = ''
  safeImageData: any;
  selectedImageId: any = null;
  selectedFile: File;

  safeImageDataList: any = [];
  BrandPhotos: any;

  myForm: FormGroup;

  form: FormGroup;
  inputerList :any []=[];
  TermsAndConditionsList :any []=[];
  showTextBoxes = false; 
  termsAndConditions : any [] = [];

  constructor(private fb: FormBuilder, private dateAdapter: DateAdapter<Date>, private globalDataService: GlobalDataService
    , private apiService: ApiService, private router: Router, private http: HttpClient) {
    const currentDate = new Date();
    const nextThreeMonths = new Date();
    nextThreeMonths.setMonth(currentDate.getMonth() + 3);
    this.minDate = currentDate.toISOString().split('T')[0];
    this.maxDate = nextThreeMonths.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.createForm();
    this.form = this.fb.group({
      textArray: this.fb.array([]),
    });

    this.userData = this.globalDataService.getUserData();
    this.imageFile = this.userData.BrandLogo;
    this.getImageSrc();
    this.getBrandPhotos();
    this.GetInputerList();
    this.GetTermsAndConditions();
  }

  createTextBox(): FormGroup {
    return this.fb.group({
      text: ['', Validators.required],
    });
  }

  get textArray() {
    return this.form.get('textArray') as FormArray;
  }

  addTextBox() {
    this.textArray.push(this.createTextBox());
    this.showTextBoxes = true; 
  }

  removeTextBox(index: number) {
    this.textArray.removeAt(index);
    this.termsAndConditions.splice(index, 1);
  }



  GetInputerList (){
    this.apiService.GetBlockOnInputerList().subscribe(
      (response) => {
        if (response) {
          this.inputerList = response;
          console.log(this.inputerList)

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

  
  GetTermsAndConditions (){
    this.apiService.GetTermsAndConditions().subscribe(
      (response) => {
        if (response) {
          this.TermsAndConditionsList = response;
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

  selectedTermIds: any[] = []; // Initialize it as an empty array

  onCheckboxClick(term: any): void {
    const termId = term.TermAndCondition;
    if (this.selectedTermIds.includes(termId)) {
      // If the term ID is already in the selectedTermIds array, remove it
      const index = this.selectedTermIds.indexOf(termId);
      if (index !== -1) {
        this.selectedTermIds.splice(index, 1);
      }
    } else {
      // If the term ID is not in the selectedTermIds array, add it
      this.selectedTermIds.push(term.TermAndCondition);
    }
    console.log(this.selectedTermIds);
  }

  updateTradable() {
    if (this.isTradable = !this.isTradable) {
      this.tradable.push(3);
    } else {
      const index = this.tradable.indexOf(3);
      if (index !== -1) {
        this.tradable.splice(index, 1);
      }
    }
    console.log(this.tradable);
  }

  updateTransferable() {
    if (this.isTransferable = !this.isTransferable) {
      this.tradable.push(4);
    } else {
      const index = this.tradable.indexOf(4);
      if (index !== -1) {
        this.tradable.splice(index, 1);
      }
    }
  }

  openPopup(color: any) {
    this.backgroundColor = color;
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  openSecondModal() {
    this.isSecondModalOpen = 'block';
  }

  closeSecondModal() {
    this.isSecondModalOpen = 'none';
  }

  onImageClick(imageData: any) {
    this.url = '';
    this.safeImageData = imageData.imageSrc;
    this.selectedImageId = imageData.id;
    this.isSecondModalOpen = 'none';
  }

  getImageSrc() {
    this.safeImageData = ('data:image/jpeg;base64,' + this.imageFile);
  }


  onBackgroundColorChange(value: string): void {
    // this.selectedBackgroundColor = value;
  }

  handleClick(value: number) {
    this.discountAmount = value;
  }
  radioClick(val: any) {
    this.radioValue = true;
  }

  onRadioClick(val: any) {
    this.tradable = val;
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

  createForm(): void {
    this.myForm = this.fb.group({
      schemeName: ['', [Validators.required]],
      discountAmount: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      billValue: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      noOfBlock: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      expiryDate: [null, [Validators.required]],
      perBlockRate: ['', [Validators.required, Validators.pattern('^0\.[0-9]+$')]],
      inputerIdControl: new FormControl('',Validators.required),

    });
  }

  submitForm(): void {
    let formData = new FormData()
    formData.append('CorpUserID', this.userData.UserId);
    formData.append('BrandID', this.userData.BrandId);
    formData.append('BrandName', this.userData.BrandName);
    formData.append('BlokCatID', this.noOfBlock);
    formData.append('SchemeName', this.schemeName);
    formData.append('DiscountAmount', this.discountAmount);
    formData.append('NumberOfBlocks', this.noOfBlock);
    const formattedExpiryDate = format(this.expiryDate, 'yyyy-MM-dd');
    formData.append('ExpiryDate', formattedExpiryDate);
    formData.append('MinimumBillValue', this.billValue);
    formData.append('SchemeOption', this.tradable.join(','));
    formData.append('RecommandedBy', this.inputerId);
    formData.append('RecommandedCost', this.perBlockRate);
    formData.append('TxtColor', this.textColor);
    formData.append('BgColor', this.backgroundColor);
    formData.append('BgSecondaryColor', this.secondaryColor);
    formData.append('SchemeLogo', this.selectedFile);
    formData.append('ImageId', this.selectedImageId);
    // formData.append('selectedTermIds', this.selectedTermIds.join(','));

    this.termsAndConditions.push(...this.selectedTermIds);
    for (let i = 0; i < this.termsAndConditions.length; i++) {
      formData.append('termAndConditionsList', this.termsAndConditions[i]);
    }

    this.apiService.InsertBrandDiscountScheme(formData).subscribe(
      (response) => {
        console.log(response);
        if (response.message === 'Success') {
          // Show success SweetAlert
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Your have successfully created discount block.',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/admin/view-blockon-scheme']);
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
    if (this.currentStep == 6) {
      this.value = 'Amount=' + this.discountAmount;
    }
    this.currentStep++;
  }

  previousStep() {
    this.currentStep--;
  }



}
