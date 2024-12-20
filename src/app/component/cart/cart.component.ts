import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  increaseQuantity(quantity: number): void {
     quantity++; 
  } 

  decreaseQuantity(quantity: number): void {
    if (quantity > 1) { 
      quantity--; 
    } 
  }
}
