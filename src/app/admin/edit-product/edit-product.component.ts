import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../service/product.service';
import { ApiResponse } from '../../dto/response/api.response';
import { AlertService } from '../../service/alert.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-edit-product',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditroductComponent implements OnInit{
  @Output() closeEvent = new EventEmitter<void>();
  @Input() productIdSelect?: string;
  productForm!: FormGroup;
  isEdit: boolean= false;
  productSelected : any;


  constructor(private fb: FormBuilder,
    private productService: ProductService,
    private alert: AlertService,
    private route: Router
  ){}
  ngOnInit(): void {
    this.productForm = this.fb.group({ 
      name: ['', Validators.required], 
      description: ['', Validators.required], 
      vendor: ['', Validators.required], 
      price: ['', [Validators.required, Validators.min(0)]],
      stock_quantity: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required], 
      discount: [''], 
      images: [null, Validators.required]
    })  
      if(this.productIdSelect) { //Nếu có product id tiieens hành load và chuyển form thành form edit
        this.isEdit = true;
        this.loadData(this.productIdSelect);
      }     
  }

  setDataFromGroup(){
    this.productForm.setValue({
      name: this.productSelected.name, 
      description: this.productSelected.description,
      vendor: this.productSelected.vendor,
      price: this.productSelected.price,
      stock_quantity: this.productSelected.stock_quantity,
      category: this.productSelected.category,
      discount: null,
      images: this.productSelected.images[0].url //Lấy ra phần tử đầu tiên
    })
  }


  //Lấy ra file đầu tiên
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
  
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.productForm.patchValue({
        images: file
      });
    }
  }

  loadData(id: string):any{
      this.productService.getProductById(this.productIdSelect!).subscribe(
          (res: ApiResponse<any>) => {
              if(res.code ===0){
                this.productSelected = res.result;
                console.log(res.result.images[0].url)
                this.setDataFromGroup();
              }
              else
                this.route.navigateByUrl("/admin/product"); //Nếu không lấy được chuyển về trang quản ;ý product
          }
      )
  }

  close(){
    this.closeEvent.emit();
  }
  
  onSubmit(){
    if(this.productForm.valid){
      const formData = new FormData();
      Object.keys(this.productForm.controls).forEach(key => {
        formData.append(key, this.productForm.get(key)?.value);
      })

      formData.forEach((value, key) => { console.log(`Key: ${key}, Value: ${value}`); });

      if(this.isEdit){
        //Xử lý edit
      }else{
        this.productService.create(formData).subscribe(
          (res: ApiResponse<any>) => {
            if(res.code === 0){
              this.alert.success("Successful!!!")
              this.route.navigateByUrl('/admin/product');
            }else{
              this.alert.warn("Có lỗi xảy ra!!");
            }
          },
          (error) => {
            this.alert.warn("Có lỗi xảy ra ở server!!");
          }
        )
      }
    }
  }
}
