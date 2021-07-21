import { IGradical } from './interfaces/IGradical';
import { IRasterizer } from './interfaces/IRasterizer';
import { IGradicalSettings } from './interfaces/IGradicalSettings';
import { IZoomable } from './interfaces/IZoomable';
import { Rasterizer } from './Rasterizer';
import * as d3 from 'd3';
import { feature } from 'topojson';
import { ReturnStatement } from '@angular/compiler';

export class Gradical implements IGradical {
  private Projection: any;
  public Land: any;
  public Features;
  public Rasterizer: IRasterizer;
  public Settings: IGradicalSettings;
  public GeoPath:any;
  private size: { width: number; height: number };

  constructor(config: IGradicalSettings) {
    this.Settings = config;
    const setups = this.Settings.Setup();
    this.Features = setups.Features;
    this.Land = setups.Land;
    this.size = { width: 0, height: 0 };
  }

  public Init(canvas: HTMLCanvasElement): void {
    this.size.width = canvas.width;
    this.size.height = canvas.height;
    this.Projection = d3[this.Settings.Projection]().fitExtent(
      [
        [0, 0],
        [this.size.width, this.size.height],
      ],
      this.Land
    );
    this.Rasterizer = new Rasterizer(canvas);

    this.GeoPath = this.Rasterizer.RegisterGeoRasterizer(this.Projection);
    this.Rasterizer.AddLayer(() =>
      this.Rasterizer.RenderBackground(this.Settings.ColorProfile.BgColor)
    );
    this.Rasterizer.RegisterAnimationFunction(this.Settings.Animation(this));
    this.Rasterizer.Render();
  }

  public PreRenderGraph() {
    const centroids = this.Features.map((el) => d3.geoCentroid(el));
    const mapped = centroids.map((el) => this.Projection(el));
    return { unmapped: centroids, mapped: mapped };
  }

  public ScaleTranslate(
    feature:any
  ): any {
    return ()=> this.GeoPath.bounds(feature)
  }
}
