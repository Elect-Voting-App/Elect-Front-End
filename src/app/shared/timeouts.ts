import * as $ from 'jquery';

export class TimeOut {
  displayErrorTimeout() {
    setTimeout(() => {
      $('.alert-danger').slideUp("slow");
    }, 5000);
  }
  displaySuccessTimeout() {
    setTimeout(() => {
      $('.alert-danger').slideUp("slow");
    }, 5000);
  }
}