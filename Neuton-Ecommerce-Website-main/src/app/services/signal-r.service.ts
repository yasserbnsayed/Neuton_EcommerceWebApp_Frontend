import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;

  orders: any[] = [];
  baseUrl = 'https://localhost:7210/api';

  stutus = new BehaviorSubject(0);

  constructor(private httpclient: HttpClient) {
    const id = localStorage.getItem('userId');
    if (id != null) {
      this.GetAllOrdersByUserId(id).subscribe((data) => {
        this.orders = data;
        console.log('All orders from SignalR Service : ', this.orders[0].id);
        console.log('All orders from SignalR Service : ', this.orders);
      });
    }

    // .withUrl('http://localhost:63468/orderStatusHub', {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Debug)
      .withUrl('http://nashed212-001-site1.atempurl.com/orderStatusHub', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();
  }

  public startConnection = async () => {
    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started');
        const id = localStorage.getItem('userId');
        if (id != null) {
          this.GetAllOrdersByUserId(id).subscribe((data) => {
            data.forEach((p: any) => {
              this.hubConnection.invoke('SubscribeToOrderUpdates', `${p.id}`);
            });
          });
        }

        this.addTransferChartDataListener();
      })
      .catch((err) => console.log('Error while starting connection: ' + err));
  };

  addTransferChartDataListener() {
    this.hubConnection.on('updateYourOrder', (updatedOrderStatus: any) => {
      this.stutus.next(updatedOrderStatus);
    });
  }

  GetAllOrdersByUserId(id: string): Observable<any[]> {
    return this.httpclient.get<any[]>(
      `${this.baseUrl}/Order/getOrdersByUserId?id=${id}`
    );
  }
}
