import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UsersService} from "../../users.service";
import {AuthService} from "../../auth.service";
import {IUser} from "./IUser";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() notify:EventEmitter<number>=new EventEmitter();
  id:String;
  pass:String;
  user:IUser;

  constructor(private userService:UsersService, private authService:AuthService,private router:Router) { }

  ngOnInit() {
  }

  logIn() {
    this.userService.checkUser(this.id)
      .subscribe(res =>{
          this.user=res;
          if(this.user.password===this.pass){
            this.authService.login(this.id)
              .subscribe(res=>{
                this.notify.emit(1);
              })
          }
          else {
            this.notify.emit(2);
          }
      },err=>{
        this.notify.emit(3);

      });
  }

  signUp() {

  }
}
