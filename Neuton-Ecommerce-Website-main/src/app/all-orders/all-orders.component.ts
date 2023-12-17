import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Order2Service } from '../services/order2.service';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { SignalRService } from '../services/signal-r.service';
@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss'],
  providers: [MessageService],
})
export class AllOrdersComponent {
  @ViewChild('popup', { static: false }) myElementRef?: ElementRef;
  orderIdDelete: number = 0;
  orderItem: any = {} as any;
  order: any = {} as any;
  orders: any[] = [];
  total: number = 0;
  orderId: number = 0;
  imgName: string = '';
  language: string = localStorage.getItem('lang') || 'en';

  curruntStatus = new BehaviorSubject(0);

  constructor(
    private messageService: MessageService,
    private order2Service: Order2Service,
    private router: Router,
    private _SignalRService: SignalRService
  ) {}

  ngOnInit(): void {
    this.getAllOrder();

    this._SignalRService.stutus.subscribe((s) => {
      this.curruntStatus.next(s);
      console.log('curruntStatus : ', this.curruntStatus.getValue());
    });
  }

  getAllOrder() {
    const id = localStorage.getItem('userId');
    if (id != null) {
      this.order2Service.GetAllOrdersByUserId(id).subscribe((data: any) => {
        this.orders = data;
        console.log('this.orders : ', this.orders);
      });
    }
  }
  trackPackage(id: number) {
    this.router.navigate(['/tracking', id]);
  }
  cancelOrder() {
    this.order2Service
      .GetOrderById(this.orderIdDelete)
      .subscribe((data: any) => {
        this.order = data;
        if (this.order.status < 2) {
          this.order2Service.DeleteOrder(this.orderIdDelete).subscribe(() => {
            this.showSuccess()
            this.getAllOrder();
            this.close();
          });
        }
      });
  }
  show(id: number) {
    this.orderIdDelete = id;
    // if (this.myElementRef) {
    //   const myElement = this.myElementRef?.nativeElement;
    //   myElement.style.display = 'block';
    // }
    this.visible = true;
  }
  close() {
    // const myElement = this.myElementRef?.nativeElement;
    // myElement.style.display = 'none';
    this.visible = false;
  }

  // Toast Functinality

  visible: boolean = false;

  // showDialog() {
  //   this.visible = true;
  // }

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Done',
      detail: 'Your Order Canceled',
    });
  }
}
