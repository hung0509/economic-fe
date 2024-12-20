import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { EditroductComponent } from "../../edit-product/edit-product.component";
import { NgxPaginationModule } from 'ngx-pagination'

@Component({
    selector: 'app-product-admin',
    standalone: true,
    imports: [CommonModule, EditroductComponent, NgxPaginationModule],
    templateUrl: 'product-admin.component.html',
    styleUrl: 'product-admin.component.scss'
})
export class ProductAdminComponent{
    componentAddProduct: boolean = false;
    selectedProduct: string = "";
    p: number = 1; // Trang hiện tại 
    itemsPerPage: number = 5; // Số mục trên mỗi trang 
    totalItems: number = 10
    maxSize: number = 5; // Số trang tối đa hiển thị

    display(){
        this.componentAddProduct = true;
    }

    handleClose() {
         this.componentAddProduct = false;
    }

    getIdProduct(id: string){
        this.componentAddProduct = true;
        this.selectedProduct = id;
    }
}