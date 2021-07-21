import { Component, OnInit } from '@angular/core';
import { Different } from '../Gradical/modes/default.mode'
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  public Profile:any;
  constructor() {
    this.Profile = Different;
   }

  ngOnInit(): void {
  }

}
