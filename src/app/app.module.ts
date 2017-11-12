import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './welcome/login/login.component';
import { NavbarComponent } from './welcome/navbar/navbar.component';
import { MainComponent } from './main/main.component';
import {BlogService} from "./blog.service";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {AllBlogsComponent} from "./main/all-blogs/all-blogs.component";
import {RouterModule, Routes} from "@angular/router";
import {UsersService} from "./users.service";
import {AuthService} from "./auth.service";
import {AuthGuardService} from "./auth-guard.service";
import { NavItemsComponent } from './nav-items/nav-items.component';

const appRoutes: Routes = [
  { path: 'welcome', component: WelcomeComponent,
    children :[
      {
        path:'' , component: LoginComponent
      }
    ]
  },
  {
    path:'home',
    component: NavbarComponent,
    canActivate:[AuthGuardService],
    children :[
      {
        path:'' , component: NavItemsComponent,
        canActivateChild:[AuthGuardService]
      }
    ]
  },
  { path: '',
    redirectTo: '/welcome',
    pathMatch: 'full'
  },
  { path: '**', redirectTo:'/welcome' }
];


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    NavbarComponent,
    MainComponent,
    AllBlogsComponent,
    NavItemsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [BlogService,
    UsersService,
    AuthService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
