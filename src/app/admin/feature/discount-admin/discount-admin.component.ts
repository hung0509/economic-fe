import { Component, OnInit } from "@angular/core";
import { AlertService } from "../../../service/alert.service";
import { DiscountService } from "../../../service/discount.service";
import { ApiResponse } from "../../../dto/response/api.response";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgxPaginationModule } from "ngx-pagination";

@Component({
    selector: 'app-discount-admin',
    standalone: true,
    imports: [CommonModule, FormsModule, NgxPaginationModule],
    templateUrl: 'discount-admin.component.html',
    styleUrl: 'discount-admin.component.scss'
})
export class DiscountAdminComponent implements OnInit{
    discounts: any  
    detailDiscount: any;
    discountCode: string = '';
    p: number = 1; // Trang hiện tại 
    itemsPerPage: number = 5; // Số mục trên mỗi trang 
    totalItem: any = 0;
    maxSize: number = 5; // Số trang tối đa hiển thị
    currentPage: number = 1;

    constructor(private alert: AlertService, protected discountService: DiscountService, private route: Router){}

    ngOnInit(): void {
        this.loadData();
    }

    loadData(){
        this.discountService.totalDiscount().subscribe(
            (res)=>{ 
                this.totalItem = res 
            }
        )

        this.discountService.getAll(this.currentPage-1, this.itemsPerPage).subscribe(
            (res: ApiResponse<any>) => {
                if(res.code === 0){
                    this.discounts = res.result.map((discount: any, index: number) => ({
                        ...discount, index: index+1
                    }));
                    this.loadDetailDiscount(this.discounts[0]); 
                }
            },
            () => this.route.navigateByUrl("/404")
        );
    }

    loadDetailDiscount(discount: any){
        this.detailDiscount = discount;
    }

    checkActive(discount: any) : boolean{
        const dateStart: Date = new Date(discount.start_at);
        const dateExpire: Date = new Date(discount.end_at);
        return discount.active && (dateExpire> dateStart)
    }

    createDiscount(){
        this.discountService.createDiscount().subscribe(
            (res: ApiResponse<any>) => {
                if(res.code === 0){
                    this.alert.success(res.message);
                    this.loadData();
                }
                else
                    this.alert.warn(res.message);
            },
            (err) => this.alert.error("An error here")
        );
    }

    unActive(discount: any){
        this.discountService.deleteDiscount(discount.id).subscribe(
            (res: string) => {
                this.alert.success(res)
                this.loadData()
            },
            (err) => this.alert.error(err)
        );
    }

    onPageChange(page: number){
        this.currentPage = page;
        this.p = page;
        this.loadData();
    }
}