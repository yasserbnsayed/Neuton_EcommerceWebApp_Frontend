import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _HttpClient:HttpClient) { }

  baseURL = 'https://localhost:7210/api/'
  
  allProducts():Observable<any>{
    return this._HttpClient.get(this.baseURL + 'Product/AllProductsWithCategoryName')
  }

  productsByCategory(id:any):Observable<any>{
    return this._HttpClient.get(this.baseURL + `Product/GetProductsByCategory?categoryid=${id}`)
  }

  productsByPrice(catId:any,minPrice:any,maxPrice:any):Observable<any>{
    return this._HttpClient.get(this.baseURL + 
      `Product/FillterByPrice?catid=${catId}&minprice=${minPrice}&maxprice=${maxPrice}`)
  }

  productsById(id:number):Observable<any>{
    return this._HttpClient.get(this.baseURL + 
      `Product/GetProdById?id=${id}`)
  }
  // https://localhost:7210/api/Product/GetProdById?id=1

  getAllCategories():Observable<any>{
    return this._HttpClient.get(this.baseURL + `Category/AllSubCategories`)
  }
  
  // getCategories():Observable<any>{
  //   return this._HttpClient.get(this.baseURL + `Category/Categories`)
  // }

  // getSubCategories(id:any):Observable<any>{
  //   return this._HttpClient.get(this.baseURL + `Category/SubCategories?id=${id}`)
  // }

  dataArraySubject: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  filterProducts$: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  multiCats$: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);

  products:any [] = []
  totalPrice: number = 0;

  // AllProducts = new BehaviorSubject([]);

  getCartProducts() {
    this.products = []
    let IDs: any[] = JSON.parse(localStorage.getItem('cartProducts')!);
    if ('cartProducts' in localStorage) {
      // console.log(this.IDs)
      for (let i = 0; i < IDs.length; i++) {
        this.productsById(IDs[i].id)
          .subscribe(async (p) => {
            await this.products.push({ product: p, q: IDs[i].qty });
            // console.log(this.products)
            // this.getTotalPrice();
          });
      }
      this.dataArraySubject.next(this.products)
    }
  }


  getProductById(id:any):Observable<any>{
    return this._HttpClient.get(this.baseURL + `Product/GetProdById?id=${id}`)
  }

}
