import { Injectable } from '@angular/core';
import {images} from './provider-settings/images'
import {color} from './provider-settings/colors'

@Injectable({
  providedIn: 'root'
})
export class StyleProviderService {
  public Images:any;
  public Color: any;
  constructor() {
    this.Images = images;
    this.Color = color;
   }
}
