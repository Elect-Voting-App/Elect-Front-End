import { Component, OnInit } from '@angular/core';
import { VoterService } from '../../shared/services/voter.service';

@Component({
  selector: 'app-view-results',
  templateUrl: './view-results.component.html',
  styleUrls: ['./view-results.component.css']
})
export class ViewResultsComponent implements OnInit {

  constructor(private voterService: VoterService) { }

  ngOnInit(): void {
    this.getResults()
    console.log(this.groupedData);
  }

  results = []
  groupedData = []
  

  getResults() {
    this.voterService.getResults()
      .subscribe(
        success => {
          if (success.status) {
            this.results = success.data
            this.doGenerateData()
          }
        }, error => console.error('Error', error)
      );
  }

  doGenerateData() {

    let categories = []

    this.results.forEach(ad => {

      let current_category = ad.category_name

      if (!categories.includes(current_category)) {

        let category_data = []

        this.results.forEach(add => {

          if (add.category_name == current_category) {

            category_data.push(add)

          }

        });

        let positions = []
        let position_candidates = []

        category_data.forEach(cd => {

          let current_position = cd.position_name

          if (!positions.includes(current_position)) {

            // console.log(current_position);

            let position_data = []

            category_data.forEach(cdd => {

              if (cdd.position_name == current_position) {

                let candidate = {
                  candidate_name: cdd.fullname,
                  candidate_voteID: cdd.votes
                }

                position_data.push(candidate)
              }
            });

            let new_postion_candidate = {
              position_name: current_position,
              candidates: position_data
            }

            position_candidates.push(new_postion_candidate)


            positions.push(current_position)
          }
        });

        // console.log(current_category);
        // console.log(position_candidates);

        let new_data = {
          category_name: current_category,
          positions: position_candidates
        }

        this.groupedData.push(new_data)

        // console.log(category_data);

        categories.push(current_category)
      }

    });
  }

}
