import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { GlobalDataService } from 'src/app/services/global-data.service';


@Component({
  selector: 'app-pick-images',
  templateUrl: './pick-images.component.html',
  styleUrls: ['./pick-images.component.scss']
})
export class PickImagesComponent {

  url: any;
  msg = "";
  selectedFile: File;
  UserDetail: any;

  safeImageDataList: any = [];
  BrandPhotos: any;


  constructor(private router: Router, private globalDataService: GlobalDataService, private apiService: ApiService, private sanitizer: DomSanitizer) {

  }

  ngOnInit(): void {
    this.UserDetail = this.globalDataService.getUserData();
    this.getBrandPhotos();
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

  selectedFiles: File[] = [];
  selectedFilesWithUrls: { file: File, url: string }[] = [];
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

  getBrandPhotos() {
    debugger
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


  getImageListSrc() {
    this.safeImageDataList = []; // Clear the list if needed
    for (const imageFile of this.BrandPhotos) {
      const base64Image = 'data:image/jpeg;base64,' + imageFile.Photo;
      this.safeImageDataList.push({ id: imageFile.ID, imageSrc: base64Image });
    }
    console.log(this.safeImageDataList)
  }

}
