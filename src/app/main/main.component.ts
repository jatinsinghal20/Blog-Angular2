import { Component, OnInit } from '@angular/core';
import {BlogService} from "../blog.service";
import {ActivatedRoute, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {UsersService} from "../users.service";
import {AuthService} from "../auth.service";
import {IBlog} from "../IBlog";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  blogs : IBlog[];
  ids:string[];
  showBlogs:IBlog[];
  user:Object;

  home: boolean = false;
  favourites: boolean= false;
  myBlogs: boolean = false;

  constructor(private blogService :BlogService,private userService:UsersService, private authService:AuthService,private route:Router) {
    this.ids=this.blogs=this.showBlogs=[];
    this.home = false;
    this.favourites= false;
    this.myBlogs = false;
  }

  ngOnInit() {
    this.blogService.getBlogs()
      .subscribe(res => {
        this.showBlogs = this.blogs = res;
      });
    if(this.authService.id) {
      this.userService.checkUser(this.authService.id)
        .subscribe(res => {
          this.user = res;
          this.viewBlogs();
        }, err => {
          console.log("welcome to blog");
        });
    }
  }

  viewBlogs(){

    if (this.route.url === "/favourites") {
      this.home = this.myBlogs = false;
      this.favourites = true;
      this.ids = this.user['favourite'];
      this.showBlogs = this.blogs.filter(blog => this.ids.indexOf(blog.id) !== -1);
    }
    if (this.route.url === "/my-blogs") {
      this.home = this.favourites = false;
      this.myBlogs = true;
      this.ids = this.user['my_blog'];
      this.showBlogs = this.blogs.filter(blog => this.ids.indexOf(blog.id) !== -1);
    }

    if (this.route.url === "/home") {
      this.myBlogs = this.favourites = false;
      this.home = true;
      this.ids = this.user['favourite'];
      this.showBlogs.forEach(blog => {
        if (this.ids.indexOf(blog.id) !== -1) {
          blog['favourite'] = true;
        }
        else blog['favourite'] = false;
      })
    }
  }
  favourite(blog: Object,idx) {
      if(this.user['favourite'].indexOf(blog['id'])===-1){
        this.user['favourite'].push(blog['id']);
        this.showBlogs[idx]['favourite'] = true;
      }
      else {
        this.user['favourite'].splice(this.user['favourite'].indexOf(blog['id']),1);
        if(this.route.url==="/home")
          this.showBlogs[idx]['favourite'] = false;
        else this.showBlogs.splice(idx,1);
      }
      this.userService.update(this.user).subscribe(res=>{
      })
  }

  delete(blog,idx){
    this.user['my_blog'].splice(this.user['my_blog'].indexOf(blog.id),1);
    this.userService.update(this.user).subscribe();
    this.blogService.deleteBlog(blog.id).subscribe(res=> {
      console.log(res);
    });
  }

  edit(blog){
    this.blogService.changeNav(blog);
    this.route.navigate(["/edit"])
  }
}
