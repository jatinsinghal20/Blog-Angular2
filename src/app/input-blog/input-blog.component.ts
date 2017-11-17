import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {BlogService} from "../blog.service";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {UsersService} from "../users.service";
import {IBlog} from "../IBlog";

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
  blog: IBlog ;
  subscription:Subscription;

  constructor(private webService: BlogService, private router: Router, private userService : UsersService,private authService:AuthService){
  }

  ngOnInit() {
    this.blog={
      title:"",
      author:"",
      logo:"",
      category:this.categories[0].id,
      content:"",
      date:"",
      id:""
    };
    this.subscription = this.webService.navItem$.subscribe(
      item => {
        if(item) {
          console.log(item);
          this.blog['title'] = item['title'];
          this.blog.author = item['author'];
          this.blog.logo = item['logo'];
          this.blog.category = item['category'];
          this.blog.content = item['content'];
          this.blog.date = item['date'];
          this.blog.id = item['id'];
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.webService.changeNav(undefined);
  }

  onInput($event) {
    $event.preventDefault();
    console.log('selected: ' + $event.target.value);
  }

  submitForm(value){
    this.blog['author'] = this.authService.id;
    this.blog['date'] = new Date(Date.now()).toDateString();
    if(this.blog['id']){
      this.webService.updateBlog(this.blog).subscribe(res=>{
        this.router.navigate(["/my-blogs"]);
      })
    }
    else {
      this.webService.addBlog(this.blog)
        .subscribe(res=>{
            this.userService.checkUser(this.authService.id)
              .subscribe(user=>{
                user['my_blog'].push(res['id']);
                this.userService.update(user).subscribe(res=>
                {
                  this.router.navigateByUrl('/my-blogs');
                })
              });
          },
          (err) => {
            console.error(err)
          })
    }
  }
}
