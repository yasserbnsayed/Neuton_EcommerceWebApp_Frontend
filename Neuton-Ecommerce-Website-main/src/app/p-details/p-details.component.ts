import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute } from '@angular/router';
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';

@Component({
  selector: 'app-p-details',
  templateUrl: './p-details.component.html',
  styleUrls: ['./p-details.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class PDetailsComponent {
  id: any;
  product: any;
  cartProducts: any[] = [];
  relatedPros: any[] = [];

  constructor(
    private _ProductsService: ProductsService,
    private _ActivatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.id = _ActivatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getProduct(this.id);

    this.getCartProducts();

    this.images = this.product.images;

    this.responsiveOptions2 = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  getProduct(id: any) {
    this._ProductsService.productsById(id).subscribe((res) => {
      this.product = res;
      this.relatedProducts(res.categoryId);
      console.log('product details : ', this.product);
    });
  }

  getCartProducts() {
    if ('cartProducts' in localStorage) {
      let IDs: any = JSON.parse(localStorage.getItem('cartProducts')!);
      console.log(IDs);
      for (let i = 0; i < IDs.length; i++) {
        this._ProductsService.productsById(IDs[i].id).subscribe((p) => {
          this.cartProducts.push({ id: p.id, qty: IDs[i].qty });
          console.log('this.cartProducts : ', this.cartProducts);
        });
      }
    }
  }

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
        this._ProductsService.getCartProducts();
      }
    } else {
      this.cartProducts.push({ id: product.id, qty: quantity });
      localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));
      msgType = true;
      this._ProductsService.getCartProducts();
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

  // position: string = 'center';
  confirmAddToCart(position: string, pro: any, qty: number) {
    // this.position = position;

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

  qty: number = 1;

  incerment() {
    if (this.qty <= this.product.unitInStock) {
      this.qty++;
    }
  }

  decerment() {
    if (this.qty > 1) {
      this.qty--;
    }
  }

  visibleLarge: boolean = false;
  visibleMobile: boolean = false;
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

  chng(img: any) {
    let mainImg: any = document.querySelector('.mainImage');
    mainImg.src = img;
  }

  relatedProducts(catId: any) {
    console.log('this.product.categoryId', catId);
    this._ProductsService.productsByCategory(catId).subscribe((res) => {
      this.relatedPros = res;
      console.log('relatedPros : ', res);
    });
  }

  images: any[] | undefined;

  position: string = 'bottom';

  positionOptions = [
    {
      label: 'Bottom',
      value: 'bottom',
    },
    {
      label: 'Top',
      value: 'top',
    },
    {
      label: 'Left',
      value: 'left',
    },
    {
      label: 'Right',
      value: 'right',
    },
  ];

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];


  responsiveOptions2: any[] = [];


}
