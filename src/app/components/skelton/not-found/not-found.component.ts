import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  mobile: boolean | undefined;
  constructor() { }

  ngOnInit(): void {

   /* var width = $(window).width();

    //MOBILE
    if (width < 640) {
      this.mobile = true;
    } else {
      this.mobile = false;
    }*/
  }

}
