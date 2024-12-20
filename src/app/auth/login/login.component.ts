import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { AlertService } from '../../service/alert.service';
import { LoginRequest } from '../../dto/request/login.request';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { AuthenticateResponse } from '../../dto/response/auth.response';
import { ApiResponse } from '../../dto/response/api.response';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  form: FormGroup;

  constructor(public alertService: AlertService, public fb: FormBuilder, private authService: AuthService, private router: Router) {
      this.form = this.fb.group({
        username: ['', [Validators.required]], 
        password: ['', [Validators.required]] 
      });
   }

  ngOnInit(): void {
  }

  onSubmit() { 
    const loginRequest = new LoginRequest( 
      this.form.value.username, 
      this.form.value.password
    );
    this.authService.login(loginRequest).subscribe((res: AuthenticateResponse) => {
        console.log(res);
        if (res.success === true) {
            this.router.navigate(['']);
        } else {
            //Khồn được xuất hiện alert thông báo không thành công
            this.alertService.warn("Username or password is invalid!");
        }
      }, (err: ApiResponse<never>) => {
        this.alertService.warn(`${err.message}`); //Xuaats message len cho no
      });
  }


}
