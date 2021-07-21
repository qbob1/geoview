import { Component, ElementRef, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { adaptDPI } from "@thi.ng/adapt-dpi";

@Component({
  selector: 'app-hdpi-canvas',
  templateUrl: './hdpi-canvas.component.html',
  styleUrls: ['./hdpi-canvas.component.css']
})

export class HdpiCanvasComponent implements AfterViewInit {
  @Input() size: [number,number];
  @ViewChild('canvas')
  _canvas: ElementRef<HTMLCanvasElement>;
  public get canvas():  ElementRef<HTMLCanvasElement> {return this._canvas}
  private _ctx: CanvasRenderingContext2D;
  public get ctx(): CanvasRenderingContext2D {return this._ctx}
  private settings:any = {
    mobile:{
      width:window.innerWidth*.8,
      height:window.innerWidth
    },
    desktop:{
      width:window.innerWidth/2,
      height:window.innerHeight*.8
    }
  }
  constructor() { 
  }

  ngAfterViewInit(): void {
    if(window.innerHeight<window.innerWidth){
      this.settings = this.settings.desktop;
      }
      else this.settings = this.settings.mobile
    adaptDPI(this._canvas.nativeElement,this.settings.width,this.settings.height)
    this._ctx = this._canvas.nativeElement.getContext('2d')
  }
}
