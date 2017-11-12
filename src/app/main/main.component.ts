import { Component, OnInit } from '@angular/core';
import {BlogService} from "../blog.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  blogs : Object[];
  showAllBlogs : boolean;
  constructor(private blogService :BlogService) {
    this.showAllBlogs = true;
  }

  ngOnInit() {
    this.blogService.getBlogs()
      .subscribe(res=>{
        this.blogs = res;
      })
  }


}
