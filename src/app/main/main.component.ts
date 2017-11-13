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
  ids:string[];
  showBlogs:Object[];
  link1:string;
  link2:string;

  home: boolean = false;
  favourites: boolean= false;
  myBlogs: boolean = false;

  constructor(private blogService :BlogService,private userService:UsersService, private authService:AuthService,private route:Router) {
    this.ids=[];
    this.link1=this.link2="";
    this.home = false;
    this.favourites= false;
    this.myBlogs = false;
  }

  ngOnInit() {
    this.blogService.getBlogs()
      .subscribe(res=>{
        this.showBlogs=this.blogs = res;
      });
    if(this.route.url==="/favourites") {
      this.userService.checkUser(this.authService.id).subscribe(res => {
        this.home=this.myBlogs=false;
        this.favourites=true;
        this.ids = res['favourite'];
        this.showBlogs=  this.blogs.filter(blog=> this.ids.indexOf(blog['id'])!==-1);
      })
    }
    if(this.route.url==="/my-blogs"){
      this.home= this.favourites=false;
      this.myBlogs = true;
      this.userService.checkUser(this.authService.id).subscribe(res => {
        this.ids = res['my_blog'];
        this.showBlogs=  this.blogs.filter(blog=> this.ids.indexOf(blog['id'])!==-1);
      })
    }

    if(this.route.url==="/home"){
      this.myBlogs=this.favourites=false;
      this.home= true;
    }
  }

  favourite(blog: Object) {
    this.userService.checkUser(this.authService.id)
      .subscribe(res=>{
        let user= res;
        if(user['favourite'].indexOf(blog['id'])===-1){
          user['favourite'].push(blog['id']);
        }
        else {
          user['favourite']
        }
        this.userService.update(user).subscribe(res=>{
          console.log("Marked as favourite");
        })
      })
  }
}
