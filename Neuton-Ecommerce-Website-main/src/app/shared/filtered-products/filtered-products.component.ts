import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';
@Component({
  selector: 'app-filtered-products',
  templateUrl: './filtered-products.component.html',
  styleUrls: ['./filtered-products.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class FilteredProductsComponent {
  pro: any;

  constructor(
    public _ProductsService: ProductsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {

    // this.products = this.catProducts;
    this.layout = 'list';
    if ('cartProducts' in localStorage) {
      let IDs: any = JSON.parse(localStorage.getItem('cartProducts')!);
      console.log(IDs);
      for (let i = 0; i < IDs.length; i++) {
        this._ProductsService.productsById(IDs[i].id).subscribe((p) => {
          this.cartProducts.push({ id: p.id, qty: IDs[i].qty });
          console.log('this.cartProducts : ',this.cartProducts);
        });
      }
    }
  }
  @Input() catProducts: any;
  // @Input() priceProducts: any;

  visibleLarge: boolean = false;
  visibleMobile: boolean = false;

  popupProduct: any;
  popupId:boolean = false
  quickView(id: any) {
    this.popupId = false
    for (let i = 0; i < this._ProductsService.filterProducts$.getValue().length; i++) {
      if (this._ProductsService.filterProducts$.getValue()[i].id == id) {
        this.popupProduct = this._ProductsService.filterProducts$.getValue()[i];
        this.popupId = true
        console.log('this.popupProduct', this.popupProduct);
      }
    }
  }

  cartProducts: any[] = [];
  addToCart(product: any, quantity: number) {
    let msgType: boolean = false;
    if (this.cartProducts.length > 0) {
      const foundUser = this.cartProducts.find(function (p) {
        return p.id === product.id;
      });
      if (!foundUser) {
        this.cartProducts.push({ id: product.id, qty: quantity });
        localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));
        msgType = true;
        this._ProductsService.getCartProducts()
      }
    } else {
      this.cartProducts.push({ id: product.id, qty: quantity });
      localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));
      msgType = true;
      this._ProductsService.getCartProducts()
    }
    this.msgAddToCart(msgType, product);
    console.log('this.cartProducts', this.cartProducts);
  }
  msgAddToCart(msgType: boolean, product: any) {
    if (msgType == true) {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `${product.name} Added To Cart`,
      });
    }
    if (msgType == false) {
      this.messageService.add({
        severity: 'info',
        summary: 'Failed',
        detail: `${product.name} Already In Cart`,
      });
    }
  }

  position: string = 'center';
  confirmAddToCart(position: string, pro: any, qty: number) {
    this.position = position;

    this.confirmationService.confirm({
      message: 'Do you want to add this product to cart?',
      header: 'Add Product To Cart',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.addToCart(pro, qty);
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: `${pro.name} Not Added`,
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled',
            });
            break;
        }
      },
      key: 'positionDialog',
    });
  }

  layout: string = '';

  products!: any[];

  qty: number = 1;

  incerment() {
    if (this.qty <= this.popupProduct.unitInStock) {
      this.qty++;
    }
  }

  decerment() {
    if (this.qty > 1) {
      this.qty--;
    }
  }

  checkScreenSize() {
    const width = window.innerWidth;
    if (width <= 767) {
      this.visibleLarge = false;
      this.visibleMobile = true;
    } else {
      this.visibleLarge = true;
      this.visibleMobile = false;
    }
  }
}
