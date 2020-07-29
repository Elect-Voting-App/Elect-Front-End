import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { PasswordGenerator } from 'src/app/shared/password-generator';

@Component({
  selector: 'app-register-voter',
  templateUrl: './register-voter.component.html',
  styleUrls: ['./register-voter.component.css']
})
export class RegisterVoterComponent implements OnInit {

  csvRecords: any[] = [];
  header = true;
  fileLoaded = false;

  //Declaring Password Generator
  generator = new PasswordGenerator();


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
        var actualResult = new Array();
        //Adding Generated password to array
        result.forEach(row => {
          let x = JSON.parse(JSON.stringify(row).replace(/}/g, '').concat(',"password":"', this.generator.generate(), '"}'));
          actualResult.push(x);
        });
        console.log('Result', actualResult);
        this.csvRecords = actualResult;
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


export class TableCSVExporter {
  rows: any;
  constructor (table, includeHeaders = true) {
    table = table;
    this.rows = Array.from(table.querySelectorAll("tr"));

    if (!includeHeaders && this.rows[0].querySelectorAll("th").length) {
      this.rows.shift();
    }
  }

  convertToCSV () {
    const lines = [];
    const numCols = this._findLongestRowLength();

    for (const row of this.rows) {
        let line = "";

        for (let i = 0; i < numCols; i++) {
            if (row.children[i] !== undefined) {
                line += TableCSVExporter.parseCell(row.children[i]);
            }

            line += (i !== (numCols - 1)) ? "," : "";
        }

        lines.push(line);
    }

    return lines.join("\n");
}

_findLongestRowLength () {
    return this.rows.reduce((l, row) => row.childElementCount > l ? row.childElementCount : l, 0);
}

static parseCell (tableCell) {
    let parsedValue = tableCell.textContent;

    // Replace all double quotes with two double quotes
    parsedValue = parsedValue.replace(/"/g, `""`);

    // If value contains comma, new-line or double-quote, enclose in double quotes
    parsedValue = /[",\n]/.test(parsedValue) ? `"${parsedValue}"` : parsedValue;

    return parsedValue;
}
}