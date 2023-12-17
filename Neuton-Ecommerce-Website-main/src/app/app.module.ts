import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';
import { RouterModule,  } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { CarouselModule } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'primeng/carousel';
import { HttpClientModule } from '@angular/common/http';
import { ShopComponent } from './shop/shop.component';
import { CartComponent } from './cart/cart.component';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { OrderComponent } from './order/order.component';
import { DialogModule } from 'primeng/dialog';
import { AuthComponent } from './auth/auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { TrackingOrderComponent } from './tracking-order/tracking-order.component';
import { ContactComponent } from './contact/contact.component';
import { PDetailsComponent } from './p-details/p-details.component';
import { MessagesModule } from 'primeng/messages';
import { SelectButtonModule } from 'primeng/selectbutton';
import { NotfoundComponent } from './notfound/notfound.component';
import { GalleriaModule } from 'primeng/galleria';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShopComponent,
    CartComponent,
    OrderComponent,
    AuthComponent,
    AllOrdersComponent,
    TrackingOrderComponent,
    ContactComponent,
    PDetailsComponent,
    NotfoundComponent,
  ],
  imports: [
  BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    BrowserAnimationsModule,
    CarouselModule,
    TableModule,
    ToastModule,
    ConfirmDialogModule,
    CarouselModule,
    DialogModule,
    ReactiveFormsModule,
    PasswordModule,
    MessagesModule,
    ToastModule,
    SelectButtonModule,
    GalleriaModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
