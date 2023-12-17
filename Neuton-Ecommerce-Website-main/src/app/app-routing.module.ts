import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './guards/auth.guard';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { TrackingOrderComponent } from './tracking-order/tracking-order.component';
import { ContactComponent } from './contact/contact.component';
import { PDetailsComponent } from './p-details/p-details.component';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path:"home", component:HomeComponent,title:"Home"},
  {path:"shop", component:ShopComponent,title:"Shop"},
  {path:'productdetails/:id', component:PDetailsComponent},
  {path:"cart", component:CartComponent,title:"Cart"},
  {path:"auth", component:AuthComponent,title:"Auth"},
  {path:"contact", component:ContactComponent,title:"Contact"},
  {path:"order", canActivate:[AuthGuard], component:OrderComponent,title:"Order"},
  // {path:'all-orders/:orderId',canActivate:[AuthGuard],component:AllOrdersComponent,title:"All Orders"},
  {path:'all-orders',canActivate:[AuthGuard],component:AllOrdersComponent,title:"All Orders"},
  {path:'tracking/:orderId',canActivate:[AuthGuard],component:TrackingOrderComponent,title:" Tracking Package"},

  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
