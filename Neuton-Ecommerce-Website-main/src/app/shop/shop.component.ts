import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent {
  constructor(private _AuthService:AuthService) {
    // localStorage.removeItem('userToken');
    // localStorage.removeItem('userId');
    // _AuthService.logout()
  }
  ngOnInit(): void {}

  // @Input() priceValue: any;
  @Input() catValue: any;
}
