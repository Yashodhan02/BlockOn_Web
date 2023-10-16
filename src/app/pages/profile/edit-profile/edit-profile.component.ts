import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { GlobalDataService } from 'src/app/services/global-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {
  selectedFiles: File[] = [];
  selectedFilesWithUrls: { file: File, url: string }[] = [];
  safeImageData: any;
  safeImageDataList: any = [];
  imageFile: any;
  UserDetail: any;
  AllBrandDetails: any;
  BrandPhotos: any;
  photoIdsToRemove: number[] = [];

  url: any;
  msg = "";
  selectedFile: File;

  userForm: UntypedFormGroup;
  UserId: any;
  BrandId: any;
  BrandName: any;
  UserName: any;
  MobileNo: any;
  Email: any;
  Description: any;
  BrandCategory: any;

  errorMessage: any;


  constructor(private router: Router, public fb: UntypedFormBuilder, private globalDataService: GlobalDataService, private apiService: ApiService, private sanitizer: DomSanitizer) {

  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      brandName: ['', [Validators.required]],
      // mobileNo: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      // logo: [null, [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', [Validators.required]],
      desc: ['', [Validators.required]]
    });

    this.UserDetail = this.globalDataService.getUserData();
    this.getBrandAllDetail()
    this.getBrandPhotos();
  }

  getBrandAllDetail() {
    this.apiService.GetBrandAllDetail(this.UserDetail.BrandId).subscribe(
      (response) => {
        if (response) {
          this.AllBrandDetails = response;
          this.UserId = this.AllBrandDetails.UserID
          this.BrandId = this.AllBrandDetails.BrandID
          this.BrandName = this.AllBrandDetails.BrandName
          this.UserName = this.AllBrandDetails.UserName
          this.Email = this.AllBrandDetails.Email
          // this.MobileNo = this.AllBrandDetails.MobileNo
          this.Description = this.AllBrandDetails.BrandDescription
          this.imageFile = this.AllBrandDetails.BrandLogo;
          this.getImageSrc();

          this.globalDataService.clearUserData();

          let val ={
            'UserId': this.UserId,
            'UserName': this.UserName, 
            'BrandId': this.BrandId, 
            'BrandName':this.BrandName,
            'BrandLogo': this.imageFile ,
          }
           this.globalDataService.setUserData(val)
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


  getBrandPhotos() {
    this.apiService.GetBrandPhotos(this.UserDetail.BrandId).subscribe(
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

  getImageSrc() {
    this.safeImageData = ('data:image/jpeg;base64,' + this.imageFile);
  }

  getImageListSrc() {
    this.safeImageDataList = []; // Clear the list if needed
    for (const imageFile of this.BrandPhotos) {
      const base64Image = 'data:image/jpeg;base64,' + imageFile.Photo;
      this.safeImageDataList.push({ id: imageFile.ID, imageSrc: base64Image });
    }

  }

  saveChanges() {
    let formData = new FormData()
    formData.append('CorpUserID ', this.UserDetail.UserId);
    formData.append('BrandID ', this.UserDetail.BrandId);
    formData.append('BrandName', this.BrandName);
    formData.append('UserName', this.UserName);
    // formData.append('MobileNo', this.MobileNo);
    formData.append('Email', this.Email);
    formData.append('BrandCategory', this.BrandCategory);
    formData.append('BrandDescription', this.Description);
    // formData.append('image', this.selectedFile);
    // formData.append('photoIdsToRemove', this.photoIdsToRemove);
    formData.append('photoIdsToRemove', this.photoIdsToRemove.join(','));
    


    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append('images', this.selectedFiles[i]);
    }

    // for (let i = 0; i < this.photoIdsToRemove.length; i++) {
    //   formData.append('photoIdsToRemove', this.photoIdsToRemove[i]);
    // }

    this.apiService.EditCorporateProfile(formData).subscribe(
      (response) => {
        console.log(response);
        if (response.message === 'Profile Updated Successfully') {
          // this.globalDataService.clearUserData();
          // Show success SweetAlert
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Profile Updated Successfully',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              // this.getBrandAllDetail()
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
    this.selectedFiles.splice(index, 1);
    this.selectedFilesWithUrls.splice(index, 1);
  }


  removeImageOfDataBase(PhotoID: number) {
    const indexToRemove = this.safeImageDataList.findIndex((imageData: { id: number; }) => imageData.id === PhotoID);

    if (indexToRemove !== -1) {
      this.safeImageDataList.splice(indexToRemove, 1);
    }
    if (!this.photoIdsToRemove.includes(PhotoID)) {
      this.photoIdsToRemove.push(PhotoID);
    }
    // this.apiService.DeleteCorporatePhotosByID(PhotoID).subscribe(
    //   (response) => {
    //     console.log(response);
    //     if (response.message == 'Success') {
    //       this.getBrandPhotos();
    //     } else {
    //       // Handle the case where the response is not as expected
    //       console.error('Invalid response:', response);
    //     }
    //   },
    //   (error) => {
    //     // Handle errors here
    //     if (error.error && error.error.error) {
    //       console.error(error.error.error);
    //       // this.errorMessage = error.error.error;  // Display the error message
    //     } else {
    //       console.error('An error occurred:', error);
    //     }
    //   }
    // );
  }
}
