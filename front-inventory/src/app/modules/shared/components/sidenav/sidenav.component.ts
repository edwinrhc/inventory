import { Component } from '@angular/core';
import {MediaMatcher} from "@angular/cdk/layout";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {

  mobilQuery: MediaQueryList;

  constructor(media: MediaMatcher) {

    this.mobilQuery = media.matchMedia('(max-width: 600px)');

  }

}
