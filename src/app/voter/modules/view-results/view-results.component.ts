import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-results',
  templateUrl: './view-results.component.html',
  styleUrls: ['./view-results.component.css']
})
export class ViewResultsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  groupedData = [
    {
      "id": 1,
      "fullname": "Larry Godwin",
      "position_name": "President",
      "category_name": "SRC",
      "positionID": 1,
      "categoryID": 1
    },
    {
      "id": 3,
      "fullname": "Maxwell Agra",
      "position_name": "Vice President",
      "category_name": "SRC",
      "positionID": 2,
      "categoryID": 1
    },
    {
      "id": 4,
      "fullname": "Larry Okraku",
      "position_name": "President",
      "category_name": "SRC",
      "positionID": 1,
      "categoryID": 1
    },
    {
      "id": 5,
      "fullname": "Maxwell Max",
      "position_name": "President",
      "category_name": "Local NUGS",
      "positionID": 1,
      "categoryID": 2
    }
  ]

}
