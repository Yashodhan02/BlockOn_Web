import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { GlobalDataService } from 'src/app/services/global-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {
  errorMessage: string = '';
  signInForm: UntypedFormGroup;
  password: any;
  userName:any;
  userDetails:any;
  constructor(private globalDataService: GlobalDataService,
    public fb: UntypedFormBuilder,private apiService: ApiService,private router: Router,private http: HttpClient) {}

  ngOnInit(): void {
   
    this.signInForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }
  
  getLoginDetail() {
    debugger
    let formData = new FormData()
    formData.append('UserName', this.userName);
    formData.append('Password', this.password);

    this.apiService.getLoginDetail(formData).subscribe(
      (response) => {
        console.log(response);
        if (response.message === 'Login successful') {
          const userData = response.user_data;
          this.globalDataService.setUserData(userData);
          this.globalDataService.setStorageToken(response.token);

          Swal.fire({
            title: 'Success!',
            text: 'Login successful',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.router.navigate(['/admin/homepage']);
          });
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Login failed',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      },
      (error) => {
        // Handle errors here
        if (error.error && error.error.error) {
          console.error(error.error.error); 
          this.errorMessage = error.error.error;  // Display the error message
        } else {
          console.error('An error occurred:', error);
        }
      }
    );
  }

  

  onInsertUser() {
    // Example user data

    let formData = new FormData();
    formData.append('GuidCode', 'ABc-123');
    formData.append('City', 'Mumbai');
    formData.append('State', 'MH');
    formData.append('Area', 'Vashi');
    formData.append('UserName', this.userName);
    formData.append('MobileNo', '987654322');
    formData.append('Age', '23');
    formData.append('Gender', 'M');
    formData.append('Email', 'john@example.com');
    formData.append('Password', this.password);
    formData.append('EncodedPassword', this.password);

    // Make the API call to insert the user
    this.apiService.insertUser(formData).subscribe(
      (response: any) => {
        console.log('User inserted successfully:', response);
      },
      (error: any) => {
        console.error('Error inserting user:', error);
      }
    );
  }
}


