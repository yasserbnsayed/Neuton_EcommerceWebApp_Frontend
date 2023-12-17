import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {

  private http = {};
  constructor(private httpclient: HttpClient) {
    this.http = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
      }),
    };
  }
  baseUrl = 'https://localhost:7210/api';

  addOrderItem(OrderItem: any): Observable<any> {
    return this.httpclient.post<any>(
      `${this.baseUrl}/OrderItem/CreateItem`,
      JSON.stringify(OrderItem),
      this.http
    );
  }
  GetAllOrderItemsByOrderId(id: number): Observable<any[]> {
    return this.httpclient.get<any[]>(
      `${this.baseUrl}/OrderItem/AllItemsByOrderId=${id}`
    );
  }

  DeleteOrderItem(id: number): Observable<any> {
    return this.httpclient.delete<any>(
      `${this.baseUrl}/OrderItem/DeleteItem/${id}`,
      this.http
    );
  }

  EditOrderItem(OrderItem: any, id: number): Observable<any> {
    return this.httpclient.put<any>(
      `${this.baseUrl}/OrderItem/UpdateItem/${id}`,
      JSON.stringify(OrderItem),
      this.http
    );
  }

}
