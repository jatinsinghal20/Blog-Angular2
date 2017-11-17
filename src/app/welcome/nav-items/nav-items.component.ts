import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../auth.service";

@Component({
  selector: 'app-nav-items',
  templateUrl: './nav-items.component.html',
  styleUrls: ['./nav-items.component.css']
})
export class NavItemsComponent implements OnInit {

  @Output() notify:EventEmitter<number>=new EventEmitter();

  constructor(private router:Router, private authService: AuthService) { }

  ngOnInit() {
  }

  gotoFav() {
    this.router.navigate(['/favourites']);
  }

  logOut(){
    this.authService.logout();
    this.notify.emit(4);
  }
}
