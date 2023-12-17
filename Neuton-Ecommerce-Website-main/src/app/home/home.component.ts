// import { OwlOptions } from 'ngx-owl-carousel-o';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductsService } from '../services/products.service';

declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {


  constructor(private _ProductsService: ProductsService) {}

  ngOnInit(): void {
    this.getAccessories()    
  }
  //  ngOnInit() {
  //   this.getAllProducts()
  // }

  // products: any[] = [];

  // async getAllProducts() {
  //   await this._ProductsService.allPRoducts().subscribe((res) => {
  //     this.products = res
  //   })
  // }
  accessories:any [] = []
  getAccessories() {
    this._ProductsService.productsByCategory(5).subscribe((res) => {
      this.accessories = res
      console.log(this.accessories)
    });
  }


  // customOptions: OwlOptions = {
  //   loop: true,
  //   mouseDrag: true,
  //   touchDrag: true,
  //   pullDrag: true,
  //   dots: false,
  //   navSpeed: 500,
  //   navText: [
  //     '<button class="slid"><i class="fa-solid fa-arrow-left-long"></i></button>',
  //     '<button class="slid"><i class="fa-solid fa-arrow-right-long"></i></button>',
  //   ],
  //   responsive: {
  //     0: {
  //       items: 1,
  //     },
  //     400: {
  //       items: 2,
  //     },
  //     740: {
  //       items: 3,
  //     },
  //     // 940: {
  //     //   items: 3,
  //     // },
  //   },
  //   nav: true,
  // };

}
