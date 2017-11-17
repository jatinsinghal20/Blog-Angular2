import {Component, EventEmitter, Output} from '@angular/core';
import {Router} from "@angular/router";
import {log} from "util";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{
  /*view:string = "home"
  constructor(private route:Router){
    switch (route.url){
      case "/favourites" : this.view="favourites";
      case "/myBlogs" : this.view = "myblogs";
      default: this.view="home"
    }
  }*/
  @Output() notify:EventEmitter<string> = new EventEmitter();
  toggle:boolean =true;
  constructor(private router:Router) { }

  ngOnInit() {
  }

  toggleNav(login) {
    if(login===1){
      this.toggle = false;
      this.notify.emit("Log In");
      this.router.navigate(["/home"]);
    }
    if(login===4){
      this.toggle = true;
      this.notify.emit("LogOut");
      this.router.navigateByUrl("/welcome");
    }
  }
}
