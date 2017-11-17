import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http"
import 'rxjs/add/operator/map'
import {BehaviorSubject} from "rxjs/BehaviorSubject";

const BlogUrl = 'http://localhost:3000/blog/';
const header = {headers: new Headers({
    'Content-Type': 'application/json'
  }
)
};

@Injectable()
export class BlogService {

  constructor(private http: Http) { }

  private blog: Object;
  private _navItemSource = new BehaviorSubject<Object>(this.blog);
  navItem$ = this._navItemSource.asObservable();

  changeNav(data) {
    this._navItemSource.next(data);
  }

  getBlogs(){
    return this.http.get(BlogUrl)
      .map(res=> res.json());
  }

  addBlog(blogData) {
    return this.http.post(BlogUrl,blogData,header)
      .map(res=>res.json());
  }

  deleteBlog(id) {
    return this.http.delete(BlogUrl+id)
      .map(res=>res.json())
  }

  updateBlog(data) {
    return this.http.patch(BlogUrl+data.id,data,header)
      .map(res=>res.json())
  }
}
