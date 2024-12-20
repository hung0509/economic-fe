import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../component/share/header/header.component';
import { FooterComponent } from '../component/share/footer/footer.component';
import { AlertComponent } from '../component/handler/alert/alert.component';
import { AuthService } from '../service/auth.service';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from '../admin/share/navigation-bar/navigation-bar.component';
import { SideBarAdminComponent } from '../admin/share/side-bar/side-bar.component';
import { FooterAdminComponent } from '../admin/share/footer/footer-admin.component';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    HeaderComponent, 
    FooterComponent, 
    AlertComponent, 
    HttpClientModule, 
    CommonModule,
    NavigationBarComponent,
    SideBarAdminComponent,
    FooterAdminComponent
  ],
  providers: [
    AuthService,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'economic-fe';

  constructor(protected authService: AuthService){}
  
}

