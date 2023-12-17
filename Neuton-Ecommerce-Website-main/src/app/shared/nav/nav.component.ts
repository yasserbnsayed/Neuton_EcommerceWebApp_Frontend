import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  constructor(public _ProductsService: ProductsService,
    private _AuthService:AuthService) {}

  sidebarVisible: boolean = false;
  sidebarVisibleScroll: boolean = false;
  sidebarVisibleCart: boolean = false;
  totalPrice: number = 0;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    let srolTop = document.documentElement.scrollTop;
    if (srolTop > 200) {
      this.sidebarVisibleScroll = true;
    } else {
      this.sidebarVisibleScroll = false;
    }
  }

  ngOnInit(): void {
    let cart: any = document.querySelector('#cart');
    console.log(cart);
    cart.addEventListener('mouseover', (event: any) => {
      this.sidebarVisibleCart = true;
      this.getTotalPrice();
    });

    this._ProductsService.getCartProducts();


    this._AuthService.userData.subscribe(()=>{
      if(this._AuthService.userData.getValue() != null){
        this.isLogin = true
      }else{
        this.isLogin = false
      }
    })

    
    
  }

  //Get total Price for all products
  getTotalPrice() {
    this.totalPrice = 0;
    for (
      let i = 0;
      i < this._ProductsService.dataArraySubject.getValue().length;
      i++
    ) {
      this.totalPrice +=
        this._ProductsService.dataArraySubject.getValue()[i].product.price *
        this._ProductsService.dataArraySubject.getValue()[i].q;
    }
  }

  isLogin:boolean = false
  calLogout(){
    this._AuthService.logout();
  }
}
