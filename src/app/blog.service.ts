import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http"
import 'rxjs/add/operator/map'

const BlogUrl = 'http://localhost:3000/blog/';
const header = {headers: new Headers({
    'Content-Type': 'application/json'
  }
)
};

@Injectable()
export class BlogService {

  constructor(private http: Http) { }

  getBlogs(){
    return this.http.get(BlogUrl)
      .map(res=> res.json());
  }

}
