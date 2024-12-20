import { Component, OnInit } from "@angular/core";
import { CateService } from "../../../service/category.service";
import { ApiResponse } from "../../../dto/response/api.response";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AlertService } from "../../../service/alert.service";
import { Router } from "@angular/router";


@Component({
    selector: 'app-admin-category',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: 'category-admin.component.html',
    styleUrl: 'category-admin.component.scss'
})
export class CategoryAdminComponent implements OnInit{
    categories?: any;
    categoryName?: string;
    nextId: number = 1;

    constructor(protected categoryService: CateService, private alert: AlertService, private route: Router){}

    ngOnInit(): void {
       this.loadCategories();
    }

    loadCategories(){
        this.categoryService.getCategories().subscribe(
            (res: ApiResponse<any>) => {
                if(res.code === 0){
                    this.categories = res.result.map((category: any, index: number) => ({
                        ...category, id: index+1
                    }));
                }
            },
            (err) => console.log(err)
        );
    }

    onSubmit(){
        if(this.categoryName){
            this.categoryService.addCategory(this.categoryName).subscribe(
                (res: ApiResponse<any>) => {
                    if(res.code === 0){
                        this.alert.success(res.message);
                        this.loadCategories();
                    }
                    else
                        this.alert.warn(res.message);
                },
                (err) => this.route.navigateByUrl("/404")
            )
        }
    }

}