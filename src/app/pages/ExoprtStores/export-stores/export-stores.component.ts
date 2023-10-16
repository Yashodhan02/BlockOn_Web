import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { GlobalDataService } from 'src/app/services/global-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-export-stores',
  templateUrl: './export-stores.component.html',
  styleUrls: ['./export-stores.component.scss']
})
export class ExportStoresComponent {
  userData: any;

  fileToUpload: File ;

  StoreType : any ; //Partner 48, Own 49
  RoleID :any ;  // Partner Store 5,Own Store 4
  errorMessage :any;

  storeForm: UntypedFormGroup;
  storeName: any;
  mobileNo: any;
  address: any;

  msg :any;

  constructor(public fb: UntypedFormBuilder,private router: Router,private http: HttpClient,private apiService: ApiService,private globalDataService: GlobalDataService,private sanitizer: DomSanitizer) { }
  ngOnInit(): void {
    this.userData = this.globalDataService.getUserData();
    this.storeForm = this.fb.group({
      storeName: [null, [Validators.required]],
      mobileNo: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      address: [null, [Validators.required]],
    });
    console.log(this.userData)  // Retrieve user data from the service
  }

  onFileChange(event: any) {
    const file: File = event.target.files[0];
  
    if (!file) {
      return;
    }
  
    const allowedMimeTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    const mimeType = file.type;
  
    if (allowedMimeTypes.includes(mimeType)) {
      this.fileToUpload = file;
      this.msg = ''; // Reset the error message if it was previously set.
    } else {
      this.msg = 'Only xlsx files are supported';
    }
  }

  uploadExcelForOwnStore() {
    this.StoreType =49;
    this.RoleID=4;
    const formData: FormData = new FormData();
    formData.append('CorpUserID', this.userData.UserId);
    formData.append('BrandID', this.userData.BrandId);
    formData.append('StoreType', this.StoreType);
    formData.append('RoleID', this.RoleID);
    formData.append('storeName', this.storeName);
    formData.append('mobileNo', this.mobileNo);
    formData.append('address', this.address);

    formData.append('file', this.fileToUpload);
    this.apiService.ImportOwnOrPartnerStore(formData).subscribe(
      (response) => {
        console.log(response);
        if (response.message === 'Success') {
          // Show success SweetAlert
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Your have successfully Imported own store',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/admin/view-network']);
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

  
  uploadExcelForPartnerStore() {
    this.StoreType =48;
    this.RoleID=5;
    const formData: FormData = new FormData();
    formData.append('CorpUserID', this.userData.UserId);
    formData.append('BrandID', this.userData.BrandId);
    formData.append('StoreType', this.StoreType);
    formData.append('RoleID', this.RoleID);
    formData.append('storeName', this.storeName);
    formData.append('mobileNo', this.mobileNo);
    formData.append('address', this.address);

    formData.append('file', this.fileToUpload);

    this.apiService.ImportOwnOrPartnerStore(formData).subscribe(
      (response) => {
        console.log(response);
        if (response.message === 'Success') {
          // Show success SweetAlert
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Your have successfully Imported partner store',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/admin/view-network']);
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
}


