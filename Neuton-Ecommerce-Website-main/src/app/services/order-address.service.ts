import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderAddressService {
  private http = {};
  constructor(private httpclient: HttpClient) {
    this.http = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
      }),
    };
  }

  baseUrl = 'https://localhost:7210/api';
  GetAllCitiesByCountryId(id: number): Observable<any[]> {
    return this.httpclient.get<any[]>(
      `${this.baseUrl}/ShippingAddress/AllCitiesByCountryId?id=${id}`
    );
  }
  GetAllCountries(): Observable<any[]> {
    return this.httpclient.get<any[]>(
      `${this.baseUrl}/ShippingAddress/AllCountries`
    );
  }
  AddShippingAddress(ShippingAddress: any): Observable<any> {
    return this.httpclient.post<any>(
      `${this.baseUrl}/ShippingAddress/CreateShippingAddress`,
      JSON.stringify(ShippingAddress),
      this.http
    );
  }
  GetShippingAddress(userid: string): Observable<any> {
    return this.httpclient.get<any>(
      `${this.baseUrl}/ShippingAddress/GetAddressByUserId?id=${userid}`
    );
  }
}
