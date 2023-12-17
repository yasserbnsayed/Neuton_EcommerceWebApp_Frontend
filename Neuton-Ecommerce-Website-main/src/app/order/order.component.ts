import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { MessageService } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderAddressService } from '../services/order-address.service';
import { render } from 'creditcardpayments/creditCardPayments';
import { Order2Service } from '../services/order2.service';
import { OrderItemService } from '../services/order-item.service';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  providers: [MessageService],
})
export class OrderComponent {
  constructor(
    private shippingaddressService: OrderAddressService,
    private _ProductsService: ProductsService,
    private orderService: Order2Service,
    private router: Router,
    private orderItemService: OrderItemService,
    private messageService: MessageService,
  ) {
    this.shippingForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      street: new FormControl('', [Validators.required]),
      buildName: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      cityid: new FormControl('', [Validators.required]),
      countryid: new FormControl('', [Validators.required]),
    });
  }

  products: any[] = [];
  totalPrice: number = 0;

  ngOnInit(): void {

    this._ProductsService.dataArraySubject.next([]);

    this.getCartProducts();

    this.getAllcountries();
    this.getAllCitiesBycountryId();
    this.GetShippingAddress();
    // this.numOfitemCart();
    // this.checklenth();

    render({
      id: '#myPaypalButtons',
      currency: 'USD',
      value: this.totalPrice.toString(),
      onApprove: (details) => {
        //this.paidCompleted=true;
        //this.createOrder();
        alert('transaction successfully');
      },
    });
    this.checkPaid = this.paidCompleted;

  }

  IDs: any[] = JSON.parse(localStorage.getItem('cartProducts')!);
  getCartProducts() {
    if ('cartProducts' in localStorage) {
      // console.log(this.IDs)
      for (let i = 0; i < this.IDs.length; i++) {
        this._ProductsService
          .productsById(this.IDs[i].id)
          .subscribe(async (p) => {
            await this.products.push({ product: p, q: this.IDs[i].qty });
            console.log(this.products);
            this.getTotalPrice();
          });
      }
    }
  }

  getTotalPrice() {
    this.totalPrice = 0;
    for (let i = 0; i < this.products.length; i++) {
      this.totalPrice +=
        this.products[i].product.price * this.products[i].q;
    }
    // this.numOfitemCart()
    // this.totalPrice = this.totalPrice;
  }

  shippingaddress: any = {} as any;
  shipping: any = {} as any;
  countryList: any[] = [];
  cityList: any[] = [];
  _countryId: number = 0;
  userid: string = '';
  isCheck: boolean = false;
  isCheckLen: boolean = false;
  Order: any = {} as any;
  shippingForm!: FormGroup;
  // totalPrice: number = 0;
  orderId: number = 0;
  imgName: string = '';
  paidCompleted: boolean = false;
  checkPaid: boolean = false;
  orderItem: any = {} as any;

  get name() {
    return this.shippingForm.get('name');
  }
  get phone() {
    return this.shippingForm.get('phone');
  }
  get street() {
    return this.shippingForm.get('street');
  }
  get buildName() {
    return this.shippingForm.get('buildName');
  }
  get cityid() {
    return this.shippingForm.get('cityid');
  }
  get countryid() {
    return this.shippingForm.get('countryid');
  }

  addShippingAddress() {
    const formValues = this.shippingForm.value;
    this.shippingaddress.name = formValues.name;
    this.shippingaddress.phone = formValues.phone;
    this.shippingaddress.street = formValues.street;
    this.shippingaddress.buildname = formValues.buildName;
    this.shippingaddress.cityid = formValues.cityid;
    this._countryId = formValues.countryid;
    console.log(formValues.countryid);
    const id = localStorage.getItem('userId');
    if (id != null) {
      this.shippingaddress.userid = id;
      this.shippingaddressService
        .AddShippingAddress(this.shippingaddress)
        .subscribe(
          (data: any) => {
            this.showSuccess()
            console.log('Data From API : ', data);
            this.GetShippingAddress();
            this.isCheck = true
          },

          (err) => {
            console.log('Error From API : ', err);
          }
        );
      console.log(this.shippingaddress.userid);
    }
  }
  getAllcountries() {
    this.shippingaddressService.GetAllCountries().subscribe((data: any) => {
      this.countryList = data;
    });
  }
  GetShippingAddress() {
    const id = localStorage.getItem('userId');
    if (id != null) {
      this.userid = id;
      this.shippingaddressService
        .GetShippingAddress(this.userid)
        .subscribe((data: any) => {
          if (data != undefined) {            
            this.isCheck = true;
            this.shipping = data;
            console.log(this.shipping);
          }
        });
    }
  }
  // numOfitemCart() {
  //   this.totalPrice = this.totalPrice;
  //   // this.totalPrice=0;
  //   // var productList= this.cartItemService.getCartItems();
  //   // for (var i=0;i<productList.length;i++) {
  //   //   this.totalPrice+=productList[i].price * productList[i].Qty;
  //   // }
  // }

  getAllCitiesBycountryId() {
    console.log(this.countryid?.value);
    this.shippingaddressService
      .GetAllCitiesByCountryId(this.countryid?.value)
      .subscribe((data: any) => {
        this.cityList = data;
        console.log(data);
      });
  }

  convertProductToOrderItem(product: any, quantity: any): any {
    // console.log('convertProductToOrderItem : ',product)
    this.orderItem.orderId = this.orderId;
    this.orderItem.productId = product.id;
    this.orderItem.productname = product.name;
    this.orderItem.arabicProductname = product.arabicName;
    this.imgName = product.images[0];
    console.log(product.images[0]);
    this.orderItem.imgUrl = this.imgName;
    this.orderItem.count = quantity;
    this.orderItem.productPrice = product.price;
    this.orderItem.supTotalPrice = product.price * quantity;
    return this.orderItem;
  }
  checklenth() {
    const items = this.products;
    if (items.length > 0) {
      this.isCheckLen = true;
    }
  }

  addOrderItems() {
    const items = this.products;

    for (const item of items) {
      this.orderItemService
        .addOrderItem(this.convertProductToOrderItem(item.product, item.q))
        .subscribe((data: any) => {
          console.log('addOrderItems : ', data);
        });
    }
    // this.cartItemService.clearCart();
  }

  createOrder() {
    var date = new Date();
    this.Order.orderDate = date;
    const newDate = new Date(date.getTime());
    newDate.setDate(date.getDate() + 4);
    this.Order.arrivalDate = newDate;
    const id = localStorage.getItem('userId');
    this.Order.status = 0;
    this.Order.total = this.totalPrice;
    if (id != null) {
      this.Order.userId = id;
    }
    console.log(this.Order);
    this.orderService.CreateOrder(this.Order).subscribe((data: any) => {
      this.orderId = data.id;
      this.addOrderItems();
      this.navigateToOrder(data.id);
      console.log('createOrder : ', data);
    });
  }
  navigateToOrder(id: number) {
    this.router.navigate(['/all-orders']);
    localStorage.removeItem('cartProducts');
  }


  // Form to make register
  payForm: FormGroup = new FormGroup(
    {
      cardName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      cardNum: new FormControl(null, [Validators.required,]),
      date: new FormControl(null, [ Validators.required ]),
      city: new FormControl(null, [ Validators.required ]),
      zip: new FormControl(null, [Validators.required]),
    }
  );

  isCredit:boolean = false
  // stateOptions: any[] = [
  //   {label: 'Upon Delivery', value: 'delevry'}, 
  //   {label: 'Credit Card', value: 'credit'}
  // ];

    // value: string = 'delevry';

  pay(body: FormGroup){
    body.reset()
  }

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Done',
      detail: 'Your Address Added',
    });
  }


}
