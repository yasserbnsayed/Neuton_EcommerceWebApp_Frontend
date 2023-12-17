import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { ProductsService } from 'src/app/services/products.service';
import { SliderModule } from 'primeng/slider';
import { TreeModule } from 'primeng/tree';
@Component({
  selector: 'app-filter-category',
  templateUrl: './filter-category.component.html',
  styleUrls: ['./filter-category.component.scss'],
})
export class FilterCategoryComponent {
  constructor(private _ProductsService: ProductsService) {}

  // @Output() priceEmitter = new EventEmitter<any>() ;
  @Output() catEmitter = new EventEmitter<any>();

  products: any[] = [];
  allProducts: any[] = [];
  multiCatProducts:any [] = []
  crslProducts: any[] = [];
  responsiveOptions: any[] = [];

  allCats: any[] = [];
  rangeValues: number[] = [0, 10000];
  curruntCat: any = -1;
  clearFilter:boolean = false
  isLoading:boolean = false

  ngOnInit() {

    // this.multiCatProducts = []

    // if ('oneCat' in localStorage) {
    //   this.filterByCatFromHome()
    // }else{
    // }
    this.getAllProducts();
    
    this.getAllCats();
    

    this.filterationClicked();

    this._ProductsService.allProducts().subscribe((products) => {
      this.crslProducts = products;
    });

    this.responsiveOptions = [
      { breakpoint: '1024px', numVisible: 3, numScroll: 3 },
      { breakpoint: '768px', numVisible: 2, numScroll: 2 },
      { breakpoint: '560px', numVisible: 1, numScroll: 1 },
    ];
    this.filterByCatFromHome()
  }

 
  filterPrice(rangeValues: any) {
    // this.priceEmitter.emit([rangeValues[0],rangeValues[1],this.curruntCat]);
    // this.catEmitter.emit(this.filterProductsByPrice(this.products,rangeValues[0],rangeValues[1]));
    this._ProductsService.filterProducts$.next(
      this.filterProductsByPrice(this.products,rangeValues[0],rangeValues[1])
      )
  }


  filterProductsByPrice(products: any[], minPrice: number, maxPrice: number):any[] {
    return products.filter((product) => product.price >= minPrice && product.price <= maxPrice);
  }


  filterCat(catId: any,catName:any) {
    this.multiCatProducts = []
    this._ProductsService.multiCats$.next([])
    let pros:any [] =[]
    if (catName == '') {
      // this.catEmitter.emit(this.allProducts);
      this._ProductsService.filterProducts$.next(this.allProducts)
      this.products = this.allProducts
    } else {

      for (let i = 0; i < this.allProducts.length; i++) {
        if (this.allProducts[i].categoryName == catName) {
          pros.push(this.allProducts[i])
        }      
      }
      this._ProductsService.filterProducts$.next(pros)
      this.products = pros
      console.log('filterProducts : ',
      this._ProductsService.filterProducts$.getValue())

      // this._ProductsService.productsByCategory(catId).subscribe((res) => {
      //   // this.catEmitter.emit(res);
      //   this.products = res
      //   this._ProductsService.filterProducts$.next(res)
      // });
    }
    this.curruntCat = catId;
  }

  filterMulltiCat(catName: any) {
    this.clearFilter = true
    let found:boolean = true

    if (this._ProductsService.multiCats$.getValue().length > 0) {

      for (let i = 0; i < this._ProductsService.multiCats$.getValue().length; i++) {
        if (this._ProductsService.multiCats$.getValue().includes(catName)) {
          found = true
        }else{
          this._ProductsService.multiCats$.getValue().push(catName)
          found = false
          for (let i = 0; i < this.allProducts.length; i++) {
            if (this.allProducts[i].categoryName == catName) {
              this.multiCatProducts.push(this.allProducts[i])
            }      
          }
          // this.catEmitter.emit(this.multiCatProducts);
          this._ProductsService.filterProducts$.next(this.multiCatProducts)
          this.products = this.multiCatProducts
          console.log('this.multiCatProducts : ',this.multiCatProducts)
        }       
      }

    }else{
      this._ProductsService.multiCats$.getValue().push(catName)
      found = false
      for (let i = 0; i < this.allProducts.length; i++) {
        if (this.allProducts[i].categoryName == catName) {
          this.multiCatProducts.push(this.allProducts[i])
        }      
      }
      // this.catEmitter.emit(this.multiCatProducts);
      this._ProductsService.filterProducts$.next(this.multiCatProducts)
      this.products = this.multiCatProducts
      console.log('this.multiCatProducts : ',this.multiCatProducts)
    }




    // if (found == false) {
    //   for (let i = 0; i < this.allProducts.length; i++) {
    //     if (this.allProducts[i].categoryName == catName) {
    //       this.multiCatProducts.push(this.allProducts[i])
    //     }      
    //   }
    //   // this.catEmitter.emit(this.multiCatProducts);
    //   this._ProductsService.filterProducts$.next(this.multiCatProducts)
    //   this.products = this.multiCatProducts
    //   console.log('this.multiCatProducts : ',this.multiCatProducts)
    // }

    
  }

  clearMultiFilter(){
    this.filterCat(-1,'')
    this.clearFilter = false
    // this.getAllProducts()
    // this._ProductsService.filterProducts$.next(this.allProducts)
    // this.products = this.allProducts
    // this.multiCatProducts = []
    // this._ProductsService.multiCats$.next([])
  }

  async filterByCatFromHome(){
    let cat: any = await JSON.parse(localStorage.getItem('oneCat')!);
    this.filterCat(cat.id,cat.name)
    // this.filterCat(6,'HeadPhone')
    console.log('filterByCatFromHome : ',cat)
    console.log('products filterByCatFromHome : ',
    this._ProductsService.filterProducts$.getValue())
  }

  getAllCats() {
    this.isLoading = true
    this._ProductsService.getAllCategories().subscribe((res) => {
      this.allCats = res;
      this.catEmitter.emit(res);
      this.isLoading = false
      // this.products = res
    });
  }

  getAllProducts() {
    this.isLoading = true
    this._ProductsService.allProducts().subscribe((res) => {
      // this.catEmitter.emit(res);
      this.allProducts = res
      this.products = res
      this._ProductsService.filterProducts$.next(res)
      this.isLoading = false
    });
  }

  filterationClicked() {

    // Categories
    const selectCat = document.querySelector('.select-cat');
    const caretCat = document.querySelector('.caret-cat');
    const menu = document.querySelector('.menu');
    selectCat?.addEventListener('click', () => {
      caretCat?.classList.toggle('caret-rotate');
      menu?.classList.toggle('menu-open');
    });

    // Multi Categories
    const MselectCat = document.querySelector('.Mselect-cat');
    const McaretCat = document.querySelector('.Mcaret-cat');
    const Mmenu = document.querySelector('.Mmenu');
    MselectCat?.addEventListener('click', () => {
      McaretCat?.classList.toggle('caret-rotate');
      Mmenu?.classList.toggle('menu-open');
    });

    // Price
    const selectPric = document.querySelector('.select-price');
    const caretPric = document.querySelector('.caret-price');
    const range = document.querySelector('.range');
    selectPric?.addEventListener('click', () => {
      caretPric?.classList.toggle('caret-rotate');
      range?.classList.toggle('range-open');
    });
  }
}
