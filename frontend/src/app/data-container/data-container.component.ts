import { Component, Input, OnInit } from '@angular/core';
import {PbarComponent} from '../pbar/pbar.component'
import {StyleProviderService} from '../styleprovider.service'
@Component({
  selector: 'app-data-container',
  templateUrl: './data-container.component.html',
  styleUrls: ['./data-container.component.css']
})
export class DataContainerComponent implements OnInit {
  @Input() data:{ [key:string]:number; };
  private styles:any;
  constructor(styles: StyleProviderService) {
    this.styles = styles;
   }

  ngOnInit(): void {
  }

}
