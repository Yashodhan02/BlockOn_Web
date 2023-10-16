import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api.service';
import { GlobalDataService } from 'src/app/services/global-data.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})


export class HomepageComponent implements OnInit{
  safeImageData :any;
  imageFile:any;
  userData: any;
  BrandId:any;
  months = [
    { value: '7', viewValue: '7 Days' },
    { value: '14', viewValue: '14 Days' },
    { value: '21', viewValue: '21 Days' },
  ];
  constructor(private apiService: ApiService,private globalDataService: GlobalDataService,private sanitizer: DomSanitizer) { }
  ngOnInit(): void {
    this.userData = this.globalDataService.getUserData();
    this.imageFile=this.userData.BrandLogo;
    this.getImageSrc();
    console.log(this.userData)  // Retrieve user data from the service
  }

 GetCorporateUserDetail(){

  this.apiService.getLoginDetail(this.userData.BrandId).subscribe(
    (response) => {
      console.log(response);
      if (response.message === 'Login successful') {
        this.userData = response.user_data;
        console.log(this.userData);
        // this.router.navigate(['/admin/homepage']);
      } else {
       
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
  this.safeImageData =('data:image/jpeg;base64,' + this.imageFile);
  console.log(this.safeImageData);
}

}
