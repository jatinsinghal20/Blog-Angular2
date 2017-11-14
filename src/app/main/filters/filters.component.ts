import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  @Output() notify : EventEmitter<string> = new EventEmitter();

  filters: string[] =[
    "All",
    "Technology",
    "Politics",
    "Creativity",
    "Entrepreneurship",
    "Cars"
  ];
  constructor() { }

  ngOnInit() {
  }


  filterIt(filter){
    this.notify.emit(filter);
  }

}
