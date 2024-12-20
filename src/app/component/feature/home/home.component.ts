import { Component } from '@angular/core';
import { SlideBarComponent } from '../../share/slide-bar/slide-bar.component';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-home',
  imports: [SlideBarComponent, ProductComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
 
}
