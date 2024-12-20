import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { user } from '../../dto/response/user.response';
import { UserService } from '../../service/user.service';
import { ApiResponse } from '../../dto/response/api.response';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertService } from '../../service/alert.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent implements OnInit{
  protected user_info!: user ;
  updateUserForm: FormGroup;
  isEdit: boolean = false;
  
  constructor(
    protected authService: AuthService, 
    protected userService: UserService, 
    private router: Router, 
    private fb: FormBuilder,
    protected alert: AlertService){
      this.updateUserForm = this.fb.group({
        password: new FormControl({value:'', disabled:true },Validators.required),
        firstname: new FormControl({value:'', disabled:true },Validators.required),
        lastname: new FormControl({value:'', disabled:true },Validators.required),
        email: new FormControl({value:'', disabled:true },[Validators.required, Validators.email]),
        phone: new FormControl({value:'', disabled:true },Validators.required),
        andress: this.fb.group({
            apartment_no: new FormControl({value:'', disabled:true },Validators.required),
            sweet_name: new FormControl({value:'', disabled:true },Validators.required),
            city: new FormControl({value:'', disabled:true },Validators.required),
        })
      })
  }

  ngOnInit(): void {
    this.loadInfoUser();
  }

  loadInfoUser(){
    this.userService.getMyInfo().subscribe(
      (res: ApiResponse<user>) => {
        this.user_info = res.result;  //Lay ra thong tin user
        this.loadInfoForm();
      },
      (error) => {
        // Chuyển về trang 404
        this.router.navigate(['/404']);
      }
    )
  }

  loadInfoForm(){
    this.updateUserForm.setValue({
      password: this.user_info.password,
      firstname: this.user_info.firstname,
      lastname: this.user_info.lastname,
      email: this.user_info.email,
      phone: this.user_info.phone,
      andress: {
          apartment_no: this.user_info.andress.apartment_no,
          sweet_name: this.user_info.andress.sweet_name,
          city: this.user_info.andress.city}
    })
  }

  toggleForm(){
    this.isEdit = !this.isEdit;
    if(this.isEdit){ // nếu được phép chỉnh chửa thì bật các input
      this.updateUserForm.get('password')?.enable();
      this.updateUserForm.get('firstname')?.enable();
      this.updateUserForm.get('lastname')?.enable();
      this.updateUserForm.get('phone')?.enable();
      this.updateUserForm.get('email')?.enable();
      this.updateUserForm.get('andress')?.enable();
    }else{
      this.updateUserForm.get('password')?.disable();
      this.updateUserForm.get('firstname')?.disable();
      this.updateUserForm.get('lastname')?.disable();
      this.updateUserForm.get('phone')?.disable();
      this.updateUserForm.get('email')?.disable();
      this.updateUserForm.get('andress')?.disable();
    }
  }


  onSubmit(){
      this.userService.updateInfo(this.updateUserForm.value).subscribe(
          (res: ApiResponse<user>) => {
            if(res.code === 0){
              this.user_info = res.result;
              this.alert.success("cập nhật được thông tin!");
            }else
            this.alert.warn("Không thể cập nhật được thông tin!");
          },
          (error) => {
            this.alert.warn("Không thể cập nhật được thông tin!");
          }
        )
  }
}
