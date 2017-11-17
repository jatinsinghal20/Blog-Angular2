import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {IBlog} from "../../IBlog";

@Component({
  selector: 'app-all-blogs',
  templateUrl: './all-blogs.component.html',
  styleUrls: ['./all-blogs.component.css']
})
export class AllBlogsComponent{

  @Input() blog:IBlog;
  @Output() notify : EventEmitter<IBlog> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  open(){
    this.notify.emit(this.blog);
  }

}
