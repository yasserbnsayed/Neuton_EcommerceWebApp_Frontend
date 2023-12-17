import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order2Service } from '../services/order2.service';
import { OrderAddressService } from '../services/order-address.service';
import { SignalRService } from '../services/signal-r.service';
import { BehaviorSubject } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-tracking-order',
  templateUrl: './tracking-order.component.html',
  styleUrls: ['./tracking-order.component.scss'],
  providers: [MessageService],
})
export class TrackingOrderComponent {
  // @ViewChild('popup', { static: false }) myElementRef?: ElementRef;
  order: any = {} as any;
  shippingAddress: any = {} as any;
  id: number = 0;

  curruntStatus = new BehaviorSubject(0);

  constructor(
    private messageService: MessageService,
    private orderService: Order2Service,
    private activatedRoute: ActivatedRoute,
    private OrderAddressService: OrderAddressService,
    private router: Router,
    private _SignalRService: SignalRService
  ) {}
  ngOnInit(): void {
    this.setOrderIdByparam();
    this.getOrderById();
    this.getShippingAddress();

    this._SignalRService.startConnection();
    this._SignalRService.stutus.subscribe((s) => {
      this.curruntStatus.next(s);
      console.log('curruntStatus : ', this.curruntStatus.getValue());
    });
  }

  setOrderIdByparam() {
    this.id = this.activatedRoute.snapshot.paramMap.get('orderId')
      ? Number(this.activatedRoute.snapshot.paramMap.get('orderId'))
      : 0;
  }
  getOrderById() {
    this.orderService.GetOrderById(this.id).subscribe((data: any) => {
      this.order = data;
    });
  }
  getShippingAddress() {
    const id = localStorage.getItem('userId');
    if (id != null) {
      this.OrderAddressService.GetShippingAddress(id).subscribe((data: any) => {
        this.shippingAddress = data;
      });
    }
  }
  cancelOrder(id: number) {
    if (this.order.status < 2) {
      this.orderService.DeleteOrder(id).subscribe((data: any) => {
        this.close();
        this.showSuccess()
        this.router.navigate(['/all-orders']);
      });
    }
  }

  show() {
    this.visible = true;
  }
  close() {
    this.visible = false;
  }
  visible: boolean = false;

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Done',
      detail: 'Your Order Canceled',
    });
  }
}
