import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';
import {interval, animationFrameScheduler} from 'rxjs'
import {take} from 'rxjs/operators'
import { adaptDPI } from "@thi.ng/adapt-dpi";
@Component({
  selector: 'pbar',
  templateUrl: './pbar.component.html',
  styleUrls: ['./pbar.component.css']
})
export class PbarComponent implements OnInit, AfterViewInit {
  @Input() color:string;
  @Input() title:string;
  @Input() percent:number = 0;
  @ViewChild("canvas") canvas: any;
  ngOnInit() {}
  ngAfterViewInit() {
    //resize to parent container
    const parentsize = this.canvas.nativeElement.getBoundingClientRect()
    adaptDPI(this.canvas.nativeElement,parentsize.width,20)
    const end = [this.canvas.nativeElement.width,this.canvas.nativeElement.height]
    const stepsize = end[0]/1000
    const ctx = this.canvas.nativeElement.getContext("2d");
    ctx.fillStyle = "lightgrey";
    ctx.fillRect(0,0,end[0],end[1])
    ctx.fillStyle = this.color;
    animationFrameScheduler.schedule(function(num = 0) {
      if(num < 100){
        ctx.translate(stepsize,0)
        ctx.fillRect(0, 0, stepsize, end[1]);
          this.schedule(num += 1)
        }
    }, 0, 0)
  }

  constructor() { }

}
