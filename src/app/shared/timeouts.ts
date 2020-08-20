import * as $ from 'jquery';

export class TimeOut {
  displayErrorTimeout() {
    setTimeout(() => {
      $('.alert-danger').slideUp("slow");
    }, 5000);
  }
  displaySuccessTimeout() {
    setTimeout(() => {
      $('.alert-success').slideUp("slow");
    }, 5000);
  }
  
  selected(id) {
    console.log(id)
    $(`#${id}`).addclass('mybtn');
  }
}