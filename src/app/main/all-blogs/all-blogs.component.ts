import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-all-blogs',
  templateUrl: './all-blogs.component.html',
  styleUrls: ['./all-blogs.component.css']
})
export class AllBlogsComponent implements OnInit,OnChanges {
  @Input() blogs:Object[];
  @Input() id:String[];
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    if(this.id.length>0)
      this.blogs = this.blogs.filter(blog=> this.id.indexOf(blog['id'])!==-1)
  }

}
