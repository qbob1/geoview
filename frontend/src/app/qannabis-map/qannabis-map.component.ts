import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { HdpiCanvasComponent } from '../hdpi-canvas/hdpi-canvas.component';
import { Default, MapPreset } from '../Gradical/modes/default.mode';
import { IGradical } from '../Gradical/interfaces/IGradical';
import { Gradical } from '../Gradical/Gradical';

@Component({
  selector: 'qannabis-map',
  templateUrl: './qannabis-map.component.html',
  styleUrls: ['./qannabis-map.component.css'],
})

export class QannabisMapComponent implements AfterViewInit, OnInit {
  @Input("Config") Config: MapPreset;
  @ViewChild(HdpiCanvasComponent) RenderSurface: HdpiCanvasComponent;
  private Gradical:IGradical;

  constructor() {
  }

  ngOnInit():void
  {
    this.Config = this.Config
    ? this.Config
    : Default 
    console.log(this.Config)
    this.Gradical = new Gradical(this.Config.Settings);
  }

  ngAfterViewInit(): void 
  {
    this.Gradical.Init(this.RenderSurface.canvas.nativeElement);   
  };

    
    
}
