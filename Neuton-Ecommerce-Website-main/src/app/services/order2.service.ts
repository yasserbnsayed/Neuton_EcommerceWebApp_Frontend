import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Order2Service {

  private http = {};
  constructor(private httpclient: HttpClient) {
    this.http = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
      }),
    };
  }

  baseUrl = 'https://localhost:7210/api';

  CreateOrder(newOrder: any): Observable<any> {
    return this.httpclient.post<any>(
      `${this.baseUrl}/Order/CreateOrder`,
      JSON.stringify(newOrder),
      this.http
    );
  }
  GetAllOrdersByUserId(id: string): Observable<any[]> {
    return this.httpclient.get<any[]>(
      `${this.baseUrl}/Order/getOrdersByUserId?id=${id}`
    );
  }

  GetOrderById(id: number): Observable<any> {
    return this.httpclient.get<any>(
      `${this.baseUrl}/Order/getOrderById?id=${id}`
    );
  }

  DeleteOrder(id: number): Observable<any> {
    return this.httpclient.delete<any>(
      `${this.baseUrl}/Order/DeleteOrder/${id}`,
      this.http
    );
  }

  EditOrder(updatedOrder: any, id: number): Observable<any> {
    return this.httpclient.put<any>(
      `${this.baseUrl}/Order/UpdateOrder/${id}`,
      JSON.stringify(updatedOrder),
      this.http
    );
  }

}
