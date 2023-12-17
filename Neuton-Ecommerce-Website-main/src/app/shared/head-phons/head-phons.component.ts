import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';
@Component({
  selector: 'app-head-phons',
  templateUrl: './head-phons.component.html',
  styleUrls: ['./head-phons.component.scss'],
})
export class HeadPhonsComponent {
  constructor(
    private _ProductsService: ProductsService,
    // private confirmationService: ConfirmationService,
    // private messageService: MessageService
  ) {}

  products: any[] = [];

  responsiveOptions: any[] | undefined;
  isLoading:boolean = false
  ngOnInit(): void {
    this.isLoading = true
    this._ProductsService.productsByCategory(6).subscribe((res) => {
      this.products = res;
      this.isLoading = false
    });

    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }


}
