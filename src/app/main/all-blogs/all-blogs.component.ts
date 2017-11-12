import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-all-blogs',
  templateUrl: './all-blogs.component.html',
  styleUrls: ['./all-blogs.component.css']
})
export class AllBlogsComponent implements OnInit {
  @Input() blogs:Object[]
  constructor() { }

  ngOnInit() {
  }

}
