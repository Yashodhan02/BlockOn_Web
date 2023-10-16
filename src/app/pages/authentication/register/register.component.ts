import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class AppSideRegisterComponent {
  errorMessage:any;
  url: any;
  msg = "";

  signInForm: UntypedFormGroup;
  name: any;
  mobileNo: any;
  logo: any;
  email: any;
  userName: any;
  password: any
  imageFile: string= ''     
  safeImageData: any='sadasd';
  BrandCategory:any=1;
  BrandDescription:any;

  selectedFiles: File[] = [];
  selectedFilesWithUrls: { file: File, url: string }[] = [];
  constructor(private router: Router, public fb: UntypedFormBuilder, private apiService: ApiService,private sanitizer: DomSanitizer)
  {
    // this.safeImageData = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + this.imageFile);
   }

  ngOnInit(): void {

    this.signInForm = this.fb.group({
      name: [null, [Validators.required]],
      // mobileNo: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      logo: [null, [Validators.required]],
      email: [null, [Validators.required]],
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      BrandDescription: [null, [Validators.required]],
    });
  }

  submit() {
  debugger
    let formData = new FormData()
    formData.append('BrandName', this.name);
    // formData.append('MobileNo', this.mobileNo);
    // formData.append('BrandLogo', this.safeImageData);
    formData.append('Email', this.email);
    formData.append('UserName', this.userName);
    formData.append('Password', this.password);
    // formData.append('BrandPhoto', this.safeImageData);
    // formData.append('BrandCategory', this.BrandCategory);
    formData.append('BrandDescription', this.BrandDescription);
    formData.append('image', this.selectedFile);

    this.apiService.insertUser(formData).subscribe(
      (response) => {
        console.log(response);
        if (response.message === 'Registration successful') {
          // Show success SweetAlert
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'You have successfully created a account',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/authentication/login']);
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
  dataUrl: string | undefined;
  selectedFile: File;
  imageUrl: string;

  onFileChange(event: any) {
    debugger
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
  }


  onselectFile(event: any) {
    debugger;
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
      this.convertToBase64(file);
    };
  }


  convertToBase64(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
       this.imageFile = reader.result as string;
       this.safeImageData = this.imageFile.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");
    };
  }



  getImageSrc() {
    this.safeImageData = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + this.imageFile);
    console.log(this.safeImageData);
  }
  

  onFileChange1(event: any) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const url = URL.createObjectURL(file);
      this.selectedFiles.push(file);
      this.selectedFilesWithUrls.push({ file, url });
    }
    event.target.value = null; // Reset the input to allow selecting the same file again
  }

  removeImage(index: number) {
    // Remove the selected image and its URL from the arrays
    this.selectedFiles.splice(index, 1);
    this.selectedFilesWithUrls.splice(index, 1);
  }

  uploadImages() {
    const formData = new FormData();

    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append('images', this.selectedFiles[i]);
    }

    this.apiService.uploadMultipleImages(formData).subscribe(
      (response) => {
        console.log(response);
        if (response.message === 'Images uploaded successfully') {
          // Show success SweetAlert
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'You have successfully created a account',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/authentication/login']);
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
