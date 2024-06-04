import { Component } from '@angular/core';


/*
  The purpose of the Angular framework is to keep the data and views updated and in sync.
  Good angular applications are not extracting information from forms or inputs, nor performing
  incredibly complex validations in a components typescript. You should also NOT be setting or 
  getting data from the form in invasive ways. Everything should click together seamlessly and
  always be in sync.
*/
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
