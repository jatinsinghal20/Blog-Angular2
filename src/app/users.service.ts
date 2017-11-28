import { Injectable } from '@angular/core';
import {Http,Headers} from "@angular/http";

const UserUrl = 'https://blog-server-jatin.herokuapp.com//users/';
const header = {headers: new Headers({
    'Content-Type': 'application/json'
  }
)
};

@Injectable()
export class UsersService {

  constructor(private http: Http) { }

  checkUser(id){
      return this.http.get(UserUrl+id)
        .map(res=>res.json())
  }

  addUser(data){
    return this.http.post(UserUrl,data,header)
      .map(res=>res.json());
  }

  update(user) {
    return this.http.patch(UserUrl+user.id,user,header)
      .map(res=>res.json());
  }
}
