import { Component, OnInit } from '@angular/core';
import { Strain } from 'src/models/strain';
import { of, Observable } from 'rxjs';
import { StyleProviderService } from '../styleprovider.service'

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css'],
})

export class FeatureComponent implements OnInit {
  public strain$: Observable<Strain>;
  public styles: StyleProviderService;
  public options:any;
  constructor(styles: StyleProviderService) { 
    this.strain$ = of({
      Name:"Buddha Haze",
      Description:"Editors at The New York Times will take into account a number of factors before declaring a winner, including race calls made by The Associated Press and Edison Research, as well as analysis of the votes that have been reported so far. Given the changes in voting methods this year, it may not be possible to declare a winner in a number of key states on election night.",
      Stats:{
        Indica:40,
        CBD:20,
        Ruderalis:50,
        Sativa:30
      },
      Lineage:[],
      Type:"sativa"
    });
    
    this.styles = styles;
  }
  ngOnInit(): void {
  }

}
