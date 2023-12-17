import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-featured-mobiles',
  templateUrl: './featured-mobiles.component.html',
  styleUrls: ['./featured-mobiles.component.scss'],
})
export class FeaturedMobilesComponent {
  constructor(private _ProductsService: ProductsService) {}
  ngOnInit() {
    this.getAllProducts();
    this.getNewProducts()
    this.getUsedProducts()
  }

  products: any[] = [];
  newProducts: any[] = [];
  usedProducts: any[] = [];
  isLoading:boolean = false
  getAllProducts() {
    this.isLoading = true
    this._ProductsService.allProducts().subscribe((res) => {
      this.products = res;
      this.isLoading = false
    }, (err) => {
      this.isLoading = false
    });
  }
  getNewProducts() {
    this.isLoading = true
    this._ProductsService.productsByCategory(4).subscribe((res) => {
      this.newProducts = res
      console.log('this.newProducts',this.newProducts)
      this.isLoading = false
    },(err) => {
      this.isLoading = false
    });
  }
  
  getUsedProducts() {
    this.isLoading = true
    this._ProductsService.productsByCategory(5).subscribe((res) => {
      this.isLoading = false
      this.usedProducts = res
      console.log(this.usedProducts)
      this.isLoading = false
    },(err) => {
      this.isLoading = false
    });
  }
}
