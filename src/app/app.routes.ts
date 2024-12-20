import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './component/feature/home/home.component';
import { ProductDetailComponent } from './component/share/product-detail/product-detail.component';
import { ProductComponent } from './component/feature/product/product.component';
import { AboutUsComponent } from './component/feature/about-us/about-us.component';
import { FaqComponent } from './component/feature/faq/faq.component';
import { CartComponent } from './component/cart/cart.component';
import { InfoComponent } from './component/info/info.component';
import { ErrorComponent } from './component/handler/error/404.component';
import { DashboardComponent } from './admin/feature/dashboard/dashboard.component';
import { AuthGuard } from './auth/guard/auth.guard';
import { ProductAdminComponent } from './admin/feature/product-admin/product-admin.component';
import { CategoryAdminComponent } from './admin/feature/category-admin/category-admin.component';
import { DiscountAdminComponent } from './admin/feature/discount-admin/discount-admin.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'product-detail', component: ProductDetailComponent},
    { path: 'product', component: ProductComponent},
    { path: 'faq', component: FaqComponent},
    { path: 'about-us', component: AboutUsComponent},
    { path: 'cart', component: CartComponent},
    { path: 'info', component: InfoComponent},
    { path: '404', component: ErrorComponent},
    { path: 'admin', component: DashboardComponent, },
    { path: 'admin/product', component: ProductAdminComponent}, 
    { path: 'admin/category', component: CategoryAdminComponent},
    { path: 'admin/discount', component: DiscountAdminComponent},
];
