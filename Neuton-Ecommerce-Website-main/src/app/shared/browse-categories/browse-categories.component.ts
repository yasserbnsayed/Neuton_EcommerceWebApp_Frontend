import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-browse-categories',
  templateUrl: './browse-categories.component.html',
  styleUrls: ['./browse-categories.component.scss'],
})
export class BrowseCategoriesComponent {
  constructor(
    private _ProductsService: ProductsService,
    private _Router: Router
  ) {}

  allCats: any[] = [];

  isLoading:boolean = false

  ngOnInit(): void {
    this.getAllCats();
  }

  getAllCats() {
    this.isLoading = true
    this._ProductsService.getAllCategories().subscribe((res) => {
      this.allCats = res;
      this.isLoading = false
    },
    (err) => {
      this.isLoading = false
    });
  }

  // routeToShop(catId: any, catName: any) {
  //   let cat: any = { id: catId, name: catName };
  //   localStorage.setItem('oneCat', JSON.stringify(cat));
  //   // localStorage.setItem('oneCat', JSON.stringify({ id: catId, name: catName }));
  //   this._Router.navigate(['/shop']);
  // }
}
