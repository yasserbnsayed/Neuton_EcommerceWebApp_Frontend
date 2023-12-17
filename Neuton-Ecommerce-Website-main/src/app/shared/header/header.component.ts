import { OwlOptions } from 'ngx-owl-carousel-o';
import { Component } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  sliding() {
    if ($('.hero__text1').css('top') == '50%') {
      $('.slid1').fadeIn(200);
      $('.slid2').fadeOut(200);
    } else {
      $('.slid1').fadeOut(200);
      $('.slid2').fadeIn(200);
    }
  }


}

// $(".hero__slider").owlCarousel({
//   loop: true,
//   margin: 0,
//   items: 1,
//   dots: false,
//   nav: true,
//   navText: ["<span class='arrow_left'><span/>", "<span class='arrow_right'><span/>"],
//   animateOut: 'fadeOut',
//   animateIn: 'fadeIn',
//   smartSpeed: 1200,
//   autoHeight: false,
//   autoplay: false
// });
