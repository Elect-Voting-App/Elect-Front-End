import { Component, OnInit } from '@angular/core';
import { VoterService } from '../../shared/services/voter.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  constructor(private voterService: VoterService) { }

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory() {
    this.voterService.getCategories()
    .subscribe(
      success => {
        if (success.status) {
          console.log(success)
        }  
      },
      error => console.error('Error', error)
    );
  }

}
