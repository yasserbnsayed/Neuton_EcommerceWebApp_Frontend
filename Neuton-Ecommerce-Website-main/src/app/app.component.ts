import { Component, OnInit } from '@angular/core';
import { SignalRService } from './services/signal-r.service';
import { BehaviorSubject } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'app';
  curruntStatus = new BehaviorSubject(0);
  constructor(private _SignalRService: SignalRService) {}

  visible: boolean = true;
  msg = ' Ordered Today';
  isIcon: boolean = false;

  ngOnInit(): void {
    this._SignalRService.startConnection();
    this._SignalRService.stutus.subscribe((s) => {
      switch (this._SignalRService.stutus.getValue()) {
        case 1:
          this.msg = 'Shipped';
          this.visible = true;
          this.checkScreenSize()
          break;
        case 2:
          this.msg = 'Out For Delivery';
          this.visible = true;
          this.checkScreenSize()
          break;
        case 3:
          this.msg = 'Arrived';
          this.visible = true;
          this.checkScreenSize()
          break;

        default:
          break;
      }

      this.curruntStatus.next(s);
      console.log('curruntStatus from app : ', this.curruntStatus.getValue());
    });
  }
  visibleLarge: boolean = false;
  visibleMobile: boolean = false;
  checkScreenSize() {
    const width = window.innerWidth;
    if (width <= 767) {
      this.visibleLarge = false;
      this.visibleMobile = true;
    } else {
      this.visibleLarge = true;
      this.visibleMobile = false;
    }
  }
}
