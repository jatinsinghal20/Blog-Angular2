import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-items',
  templateUrl: './nav-items.component.html',
  styleUrls: ['./nav-items.component.css']
})
export class NavItemsComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  gotoFav() {
    this.router.navigate(['/favourites']);
  }
}
