import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';

@Component({
  selector: 'app-register-voter',
  templateUrl: './register-voter.component.html',
  styleUrls: ['./register-voter.component.css']
})
export class RegisterVoterComponent implements OnInit {

  csvRecords: any[] = [];
  header = true;
  fileLoaded = false;

  constructor(private ngxCsvParser: NgxCsvParser) {
  }

  @ViewChild('fileImportInput', { static: false }) fileImportInput: any;

  // Your applications input change listener for the CSV File
  fileChangeListener($event: any): void {
    this.isLoading = true;

    // Select the files from the event
    const files = $event.srcElement.files;

    // Parse the file you want to select for the operation along with the configuration
    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' })
      .pipe().subscribe((result: Array<any>) => {
        this.isLoading = false;
        this.fileLoaded = true;
        console.log('Result', result);
        this.csvRecords = result;
      }, (error: NgxCSVParserError) => {
        this.isLoading = false;
        console.log('Error', error);
      });

  }
  
  ngOnInit(): void {
  }

  isLoading = false;

  loadingRequest() {
    return this.isLoading;
  }
  
  fileLoad() {
    return this.fileLoaded;
  }



}
