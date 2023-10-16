import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from 'ngx-qrcode2';
import { GlobalDataService } from 'src/app/services/global-data.service';
import { ApiService } from 'src/app/services/api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-co-branded-blocks',
  templateUrl: './create-co-branded-blocks.component.html',
  styleUrls: ['./create-co-branded-blocks.component.scss']
})
export class CreateCoBrandedBlocksComponent {

  userData: any;
  errorMessage: any;

  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value = '';
  storename: any;
  schemeName: any;
  noOfblocks: any;
  BlockCatId: number = 6;

  currentStep: number = 1;
  formData: any = {};
  steps = [
    { number: 1, name: 'Scheme Name ' },
    { number: 2, name: 'Discount Amount' },
    { number: 3, name: 'Select Template' },
    { number: 4, name: 'Terms' },
    { number: 5, name: 'rate' },

    { number: 6, name: 'Select Template' },
  ];

  schemes: any[] = [
    { name: 'Scheme Name A', backgroundColor: '#d3ffd6' },
    { name: 'Scheme Name B', backgroundColor: '#f9decc' },
    { name: 'Scheme Name C', backgroundColor: '#b9e8ff' },
    { name: 'Scheme Name D', backgroundColor: '#d3ffd6' },
  ];

  selectedBackgroundColor: string;
  displayStyle = "none";



  backgroundColor = '#f403d1';
  secondaryColor = '#64b5f6';
  textColor = 'black'

  url: any;
  msg = "";
  imageFile: string = ''
  safeImageData: any;
  selectedImageId: any = null;
  selectedImageId2: any = null;

  selectedFile: File;

  safeImageDataList: any = [];
  BrandPhotos: any;

  myForm: any;

  perBlockRate: any;
  perBlockClickRate: any;
  perBlockReedemRate: any;
  inputerId: any;
  form: FormGroup;
  inputerList: any[] = [];
  TermsAndConditionsList: any[] = [];
  showTextBoxes = false;
  termsAndConditions: any[] = [];
  constructor(private fb: FormBuilder, private globalDataService: GlobalDataService, private apiService: ApiService, private router: Router, private http: HttpClient) {

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


  isRate1: boolean = false;
  isRate2: boolean = false;
  selectedRate: string = '';
 
  selectRateOption(rate: number) {
    if (rate === 1) {
      this.myForm.get('perBlockClickRate').clearValidators();
      this.myForm.get('perBlockClickRate').updateValueAndValidity();

      this.myForm.get('perBlockReedemRate').clearValidators();
      this.myForm.get('perBlockReedemRate').updateValueAndValidity();


      this.myForm.get('perBlockRate').setValidators([Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]);
      this.myForm.get('perBlockRate').updateValueAndValidity();

      this.isRate2 = false;
      this.perBlockClickRate = null;
      this.perBlockReedemRate = null;
      this.isRate1 = !this.isRate1;
      if (!this.isRate1) {
        this.myForm.get('perBlockRate').clearValidators();
        this.myForm.get('perBlockRate').updateValueAndValidity();
        this.perBlockRate = null;
      }

    } else if (rate === 2) {
      this.myForm.get('perBlockRate').clearValidators();
      this.myForm.get('perBlockRate').updateValueAndValidity();


      this.myForm.get('perBlockClickRate').setValidators([Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]);
      this.myForm.get('perBlockClickRate').updateValueAndValidity();

      this.myForm.get('perBlockReedemRate').setValidators([Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]);
      this.myForm.get('perBlockReedemRate').updateValueAndValidity();

      this.isRate1 = false;
      this.perBlockRate = null;
      this.isRate2 = !this.isRate2;

      if (!this.isRate2) {
        this.myForm.get('perBlockClickRate').clearValidators();
        this.myForm.get('perBlockClickRate').updateValueAndValidity();

        this.myForm.get('perBlockReedemRate').clearValidators();
        this.myForm.get('perBlockReedemRate').updateValueAndValidity();

        this.perBlockClickRate = null;
        this.perBlockReedemRate = null;
      }
    }
  }
  createForm() {
    this.myForm = new FormGroup({
      store: new FormControl('', Validators.required), // Add a validator (required in this case)
      schemeName: new FormControl('', Validators.required),
      noOfblocks: new FormControl('', Validators.required),
      perBlockRate: new FormControl(''),
      perBlockClickRate: new FormControl(''),

      perBlockReedemRate: new FormControl(''),

       inputerIdControl: new FormControl('',Validators.required),
    });
  }

  nextStep() {
    if (this.currentStep !== 2) {
      this.value = 'Name=' + this.schemeName;
    }
    this.currentStep++;
  }
  openPopup(color: any) {
    this.backgroundColor = color;
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
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
    this.noOfblocks = value;
  }
  previousStep() {
    this.currentStep--;
  }

  radioValue: boolean = false;
  radioClick(val: any) {
    this.radioValue = true;
  }





  isSecondModalOpen = 'none';

  isSecondImageModalOpen = 'none';


  openSecondModal(val: any) {
    if (val == 1) {
      this.isSecondModalOpen = 'block';
    }
    else{
      this.isSecondImageModalOpen = 'block';

    }
  }

  closeSecondModal(val :any) {
    if (val == 1) {
      this.isSecondModalOpen = 'none';
    }
    else{
      this.isSecondImageModalOpen = 'none';

    }
    // this.isSecondModalOpen = 'none';
  }

  onImageClick(imageData: any) {
    this.url = '';
    this.selectedImage1 = imageData.imageSrc;
    this.selectedImageId = imageData.id;
    this.isSecondModalOpen = 'none';
  }


  onSecondImageClick(imageData: any) {
    this.url = '';
    this.selectedImage2 = imageData.imageSrc;
    this.selectedImageId2 = imageData.id;
    this.isSecondImageModalOpen = 'none';
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


  submitForm(): void {

    debugger
    let formData = new FormData()
    formData.append('CorpUserID', this.userData.UserId);
    formData.append('BrandID', this.userData.BrandId);
    formData.append('BlokCatID', this.safeImageData);
    formData.append('SchemeName', this.schemeName);
    formData.append('NumberOfBlocks', this.noOfblocks);
    formData.append('TxtColor', this.textColor);
    formData.append('BgColor', this.backgroundColor);
    formData.append('BgSecondaryColor', this.secondaryColor);
    formData.append('SchemeLogo', this.selectedFile);
    formData.append('ImageId', this.selectedImageId);
    formData.append('RecommandedBy', this.inputerId);
    formData.append('RecommandedPerBlokCost', this.perBlockRate);
    formData.append('RecommandedPerClickCost', this.perBlockClickRate);
    formData.append('RecommandedPerReedemCost', this.perBlockReedemRate);


    this.termsAndConditions.push(...this.selectedTermIds);
    for (let i = 0; i < this.termsAndConditions.length; i++) {
      formData.append('termAndConditionsList', this.termsAndConditions[i]);
    }

    this.apiService.InsertCoBrandedBrandScheme(formData).subscribe(
      (response) => {
        console.log(response);
        if (response.message === 'Success') {
          // Show success SweetAlert
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Your have successfully created Scheme.',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              // this.router.navigate(['/admin/view-blockon-scheme']);
              this.router.navigate(['/cobranded/view-co-branded-block-scheme']);
            }
          });
        } else {
          // this.router.navigate(['/authentication/login']);
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

  selectedImage1: string = ''; // For the first image
  selectedImage2: string = ''; // For the second image
  selectedImage3: string = ''; // For the 3 image


  onFileSelect(event: any, target: string): void {
    const file = event.target.files[0]; // Get the first selected file
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // Update the appropriate selectedImage variable based on the 'target' parameter
        if (target === 'selectedImage1') {
          this.selectedImage1 = e.target.result;
        } else if (target === 'selectedImage2') {
          this.selectedImage2 = e.target.result;
        }
        else if (target === 'selectedImage3') {
          this.selectedImage3 = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
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



  GetInputerList() {
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


  GetTermsAndConditions() {
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
}
