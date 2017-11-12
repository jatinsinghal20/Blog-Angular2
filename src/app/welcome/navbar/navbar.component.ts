import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{
  /*toggle:boolean =true;
  constructor(private router:Router) { }

  ngOnInit() {
  }

  toggleNav(login) {
    if(login===1){
      this.toggle = false;
      this.router.navigate(["/home"]);
    }
    console.log(login)
  }*/
}
