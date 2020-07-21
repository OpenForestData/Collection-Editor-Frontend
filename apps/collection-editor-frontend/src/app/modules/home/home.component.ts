import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'collection-editor-frontend-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  dtOptions: any = {};

  constructor() {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
  }
}
