import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  val = {
    email: "fake@email.com",
    password: "testA12!"
  };

  constructor() {
  }

  ngOnInit() {

  }

  // Bad practice to send entire form to function
  login(loginForm: NgForm, submit: any): void {
    console.log(loginForm.value, loginForm.valid, submit);
    console.log("val", this.val);
  }

  // Value from email 'ngModelChange' event
  /*
  onEmailChange(change: any): void {
    console.log(change);
  }
  */

}
