import { Component, OnInit } from '@angular/core';
import {BlogService} from "../blog.service";
import {ActivatedRoute, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {UsersService} from "../users.service";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  blogs : Object[];
  showBlogs:string[];
  constructor(private blogService :BlogService,private userService:UsersService, private authService:AuthService,private route:Router) {
    this.showBlogs=[];
  }

  ngOnInit() {
    this.blogService.getBlogs()
      .subscribe(res=>{
        this.blogs = res;
      });
    if(this.route.url==="/favourites") {
      this.userService.checkUser(this.authService.id).subscribe(res => {
        this.showBlogs = res['favourite'];
      })
    }
    if(this.route.url==="/my-blogs"){
      this.userService.checkUser(this.authService.id).subscribe(res => {
        this.showBlogs = res['my_blog'];
      })
    }
  }

}
