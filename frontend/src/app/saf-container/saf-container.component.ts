import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {ChangeContext} from '@angular-slider/ngx-slider'
@Component({
  selector: 'app-saf-container',
  templateUrl: './saf-container.component.html',
  styleUrls: ['./saf-container.component.css']
})
export class SafContainerComponent implements AfterViewInit {
  private SafContainer:HTMLDivElement
  private ResultContainer:HTMLDivElement
  private options:any;

  constructor() {
    this.options= {
      floor: 0,
      ceil: 100
    };
   }

  ngAfterViewInit(){
    this.SafContainer = document.querySelector('.saf-container')
    this.ResultContainer = document.querySelector('.result-container')
  }
  
  ToggleSafDisplay(){
    this.SafContainer.classList.toggle('display')
    this.ResultContainer.classList.toggle('display')
  }

  onUserChange(changeContext: ChangeContext): void {
    console.log(changeContext);
  }
}
