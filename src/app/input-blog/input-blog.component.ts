import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {BlogService} from "../blog.service";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";

class Category {
  constructor(public id: string, public name: string) { }
}


@Component({
  selector: 'app-input-blog',
  templateUrl: './input-blog.component.html',
  styleUrls: ['./input-blog.component.css']
})
export class InputBlogComponent implements OnInit{


  selectedCategory: Category;
  categories = [
    new Category('Technology', 'Technology' ),
    new Category('Creativity', 'Creativity' ),
    new Category('Entrepreneurship', 'Entrepreneurship' ),
    new Category('Politics', 'Politics'),
    new Category('Cars', 'Cars')
  ];
  blog: Object;/*
  updateRequeust:boolean=false;
  subscription:Subscription;*/

  constructor(private webService: BlogService, private router: Router,private authService:AuthService){
      this.blog={};
  }

  ngOnInit() {
    this.selectedCategory = this.categories[0];
    /*this.subscription = this.webService.navItem$.subscribe(
      item => {
        this.blog = item;
        this.updateRequeust = true;

      }
    );
    console.log(this.blog);*/
  }
/*
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }*/

  onInput($event) {
    $event.preventDefault();
    console.log('selected: ' + $event.target.value);
  }

  submitForm(value){
    // console.log(this.updateRequeust);
    let newDate = new Date(Date.now());
    let blogData={
      author: this.authService.id,
      title: value.blogTitle,
      date:newDate.toString(),
      logo:value.image,
      category: value.dropdown,
      content: value.content
    };
/*

    if(this.updateRequeust){

      blogData['id']=this.blog.id;
      // blogData['votes']=this.blog.votes;
      console.log(blogData);
      this.webService.updateData(blogData)
        .subscribe(res=>{
            console.log(res);
          },
          (err) => {
            console.error(err)
          },
          ()=>{
            this.router.navigateByUrl('/home');
          })
    }
    else {
*/
      this.webService.postData(blogData)
        .subscribe(res=>{
            console.log(res);
          },
          (err) => {
            console.error(err)
          },
          ()=>{
            this.router.navigateByUrl('/home');
          })
    }
}
