import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  hideWelcome:boolean = true;
  constructor() { }

  ngOnInit() {
  }

  toggle(){
    this.hideWelcome = !this.hideWelcome;
  }
}
