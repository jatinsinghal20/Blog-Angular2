import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IBlog} from "../../IBlog";

@Component({
  selector: 'app-full-blog',
  templateUrl: './full-blog.component.html',
  styleUrls: ['./full-blog.component.css']
})
export class FullBlogComponent implements OnInit {

  @Input() blog:IBlog;
  @Output() notify : EventEmitter<IBlog> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  close(){
    this.notify.emit();
  }

}
