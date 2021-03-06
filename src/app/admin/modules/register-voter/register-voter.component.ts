import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { PasswordGenerator } from 'src/app/shared/password-generator';
import { AdminService } from '../../shared/services/admin.service';
import { TimeOut } from 'src/app/shared/timeouts';

@Component({
  selector: 'app-register-voter',
  templateUrl: './register-voter.component.html',
  styleUrls: ['./register-voter.component.css']
})
export class RegisterVoterComponent implements OnInit {

  csvRecords: any[] = [];
  header = true;
  fileLoaded = false;
  hasError = false;
  hasSuccess = false;
  isLoading = false;
  hasErrorMessage: any[] = [];
  hasSuccessMessage: string;

  registerError() {
    return this.hasError;
  }

  registerSuccess() {
    return this.hasSuccess;
  }

  //Declaring Password Generator
  generator = new PasswordGenerator();
  timer = new TimeOut();


  constructor(private ngxCsvParser: NgxCsvParser, private adminService: AdminService) {
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
        console.log('Result', result);
        this.csvRecords = actualResult;
      }, (error: NgxCSVParserError) => {
        this.isLoading = false;
        console.log('Error', error);
      });

  }

  getTable(tableID) {
    var dataTable = document.getElementById(tableID);
    const exporter = new TableCSVExporter(dataTable);
    const csvOutput = exporter.convertToCSV();
    const csvBlob = new Blob([csvOutput], { type: "text/csv" });
    const csvFile = new File([csvBlob], 'export.csv');

    this.ngxCsvParser.parse(csvFile, { header: this.header, delimiter: ',' })
      .pipe().subscribe((result: Array<any>) => {
        this.fileLoaded = false;
        for (let i = 0; i < result.length; i++) {
          const element = result[i];
          // console.log(element);
          this.adminService.registerVoter(element)
            .subscribe(
              success => {
                if (success.status) {
                  this.adminService.sendVoterEmail(element).subscribe(
                    success => {
                      if (success.status) {
                        this.hasSuccess = true;
                        this.hasSuccessMessage = success.message;
                        this.isLoading = false;
                        return;
                      } else {
                        this.hasError = true;
                        this.hasErrorMessage.push(success.message);
                        this.isLoading = false;
                        console.log(this.hasErrorMessage);
                        return;
                      }
                    },
                    error => console.log('Error', error)
                  );
                } else {
                  this.hasError = true;
                  this.hasErrorMessage.push(success.message);
                  this.isLoading = false;
                  this.timer.displayErrorTimeout();
                  console.log(this.hasErrorMessage);
                  console.log('Failed ', success)
                  return;
                }
              },
              error => console.error('Error', error)
            );
        }
      }, (error: NgxCSVParserError) => {
        console.log('Error', error);
      });
  }

  ngOnInit(): void {
  }

  loadingRequest() {
    return this.isLoading;
  }

  fileLoad() {
    return this.fileLoaded;
  }

}

//Getting CSV Data From the Table
export class TableCSVExporter {
  rows: any;
  constructor(table, includeHeaders = true) {
    table = table;
    this.rows = Array.from(table.querySelectorAll("tr"));

    if (!includeHeaders && this.rows[0].querySelectorAll("th").length) {
      this.rows.shift();
    }
  }

  convertToCSV() {
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

  _findLongestRowLength() {
    return this.rows.reduce((l, row) => row.childElementCount > l ? row.childElementCount : l, 0);
  }

  static parseCell(tableCell) {
    let parsedValue = tableCell.textContent;

    // Replace all double quotes with two double quotes
    parsedValue = parsedValue.replace(/"/g, `""`);

    // If value contains comma, new-line or double-quote, enclose in double quotes
    parsedValue = /[",\n]/.test(parsedValue) ? `"${parsedValue}"` : parsedValue;

    return parsedValue;
  }
}