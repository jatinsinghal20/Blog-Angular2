import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-all-blogs',
  templateUrl: './all-blogs.component.html',
  styleUrls: ['./all-blogs.component.css']
})
export class AllBlogsComponent{
  @Input() blog:Object;
  constructor() { }

  ngOnInit() {
  }
}
