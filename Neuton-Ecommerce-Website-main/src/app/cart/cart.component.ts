import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';
import { ProductsService } from '../services/products.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class CartComponent implements OnInit {
  products: any[] = [];
  totalPrice: number = 0;
  constructor(
    private router: Router,
    private elementRef: ElementRef,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    public _ProductsService: ProductsService
  ) {}
  ngOnInit(): void {
    this.getCartProducts();
  }

  IDs: any[] = JSON.parse(localStorage.getItem('cartProducts')!);
  getCartProducts() {
    if ('cartProducts' in localStorage) {
      for (let i = 0; i < this.IDs.length; i++) {
        this._ProductsService
          .productsById(this.IDs[i].id)
          .subscribe(async (p) => {
            await this.products.push({ product: p, q: this.IDs[i].qty });
            this.getTotalPrice();
          });
      }
      this._ProductsService.dataArraySubject.next(this.products);
    }
  }
  //quantity plusButton Handeling
  plusAmount(index: number) {
    this.IDs[index].qty++;
    this.products[index].q++;
    this.getTotalPrice();
    this._ProductsService.dataArraySubject.next(this.products);
    localStorage.setItem('cartProducts', JSON.stringify(this.IDs));
  }
  //quantity minusButton Handeling
  minusAmount(index: number) {
    this.IDs[index].qty--;
    this.products[index].q--;
    this.getTotalPrice();
    this._ProductsService.dataArraySubject.next(this.products);
    localStorage.setItem('cartProducts', JSON.stringify(this.IDs));
  }

  //Get total Price for all products
  getTotalPrice() {
    this.totalPrice = 0;
    for (let i = 0; i < this.products.length; i++) {
      this.totalPrice += this.products[i].product.price * this.products[i].q;
    }
  }

  //delete product from cart
  removeProduct(product: any, index: number) {
    for (let i = 0; i < this.IDs.length; i++) {
      if (product.id == this.IDs[i].id) {
        this.IDs.splice(i, 1);
        localStorage.setItem('cartProducts', JSON.stringify(this.IDs));
      }
    }

    for (let i = 0; i < this.products.length; i++) {
      if (product.id == this.products[i].product.id) {
        this.products.splice(i, 1);
      }
    }
    this._ProductsService.dataArraySubject.next(this.products);
    this.getTotalPrice();
    this.messageService.add({
      severity: 'error',
      summary: 'Deleted',
      detail: `${product.name} has been deleted`,
    });
  }

  checkOut() {
    this.router.navigate(['/order']);
    this.products = [];
    // this._ProductsService.dataArraySubject.next(this.products);
    this.totalPrice = 0;
  }
}
