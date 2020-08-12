import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'voting-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  //Toggling SideBar
  toggleSideBar() {
    this.toggleSideBarForMe.emit();
  }

  onSubmit() {
    
  }

}
