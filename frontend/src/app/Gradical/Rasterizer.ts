import { animationFrameScheduler } from 'rxjs';
import * as d3 from 'd3';
import { IRasterizer } from './interfaces/IRasterizer';

export class Rasterizer implements IRasterizer {
  public BackgroundColor: string;
  private Canvas: HTMLCanvasElement;
  private CTX: CanvasRenderingContext2D;
  private Layers: any; //Array of features to be rendered
  private GeoRasterizer: any;
  private ZoomState: {
      origin:[number,number]
      scale:number
    };

  constructor(renderSurface: HTMLCanvasElement) {
    this.Canvas = renderSurface;
    this.CTX = this.Canvas.getContext('2d');
    this.Layers = [];
    this.ZoomState = {
        origin:[0,0],
        scale:1
    }
  }

  public AddLayer(renderFunction) {
    this.Layers.push(renderFunction);
  }

  public RegisterGeoRasterizer(projection) {
    return this.GeoRasterizer = d3.geoPath(projection, this.CTX);
  }

  public RegisterAnimationFunction(animationFunction: (r: IRasterizer) => {}) {
    animationFunction(this);
  }

  public Render() {
    for (let i = 0; i < this.Layers.length; i++) {
     //this.CTX.setTransform(1, 0, 0, 1, 0, 0);
      this.Layers[i](this);
    }
  }

  public RenderPath(pathfn: any): void {
    this.CTX.beginPath();
    pathfn();
    this.CTX.stroke();
  }

  public RenderBackground(color:"string"): void {
    this.CTX.fillStyle = color;
    this.CTX.fillRect(0, 0, this.Canvas.width, this.Canvas.height);
  }

  public DrawPoint(vector: [number, number], radius: number) {
    this.CTX.beginPath();
    this.CTX.shadowBlur = 3;
    this.CTX.shadowColor = "white";
    this.CTX.arc(vector[0], vector[1], radius, 0, 2 * Math.PI);
    this.CTX.fill();
    this.CTX.stroke();
  }

  public Interpolator(fn) {
    return animationFrameScheduler.schedule(
      function (num = 0) {
        if (num <= 1.17) {
          fn(num);
          this.schedule((num += 0.01));
        }
      },
      0,
      0
    );
  }

  public InterpolatorSeries(fn: any[]) {
    let index = 0;
    return animationFrameScheduler.schedule(
      function (num = 0) {
        if (num <= 1.1 && index < fn.length) {
          fn[index](num);
          this.schedule((num += 0.01));
        } else if (num >= 1) {
          index++;
          this.schedule(0);
        }
      },
      0,
      0
    );
  }

  public DrawInterpolatedLine(fn) {
    this.Interpolator(fn);
  }

  public RasterizeGeoJSONFilled(geoFeature) {
    this.CTX.beginPath();
    this.GeoRasterizer(geoFeature);
    this.CTX.fill();
    this.CTX.stroke();
  }

  public RasterizeGeoJSONStroked(geoFeature) {
    this.CTX.beginPath();
    this.GeoRasterizer(geoFeature);
    this.CTX.stroke();
  }

  public DrawLine(a: [number, number], b: [number, number]) {
    this.CTX.moveTo(a[0], a[1]);
    this.CTX.lineTo(b[0], b[1]);
    this.CTX.stroke();
  }

  public RenderGeoGraph(coords: {
    mapped: [number, number][];
    unmapped: [number, number][];
  }) {
    const origin = coords.unmapped[100];
    for (let i = 1; i < coords.mapped.length; i++) {
      this.CTX.beginPath();
      this.GeoRasterizer({
        type: 'LineString',
        coordinates: [origin, coords.unmapped[i]],
      });
      this.CTX.stroke();
      this.DrawPoint(coords.mapped[i], 5);
    }
  }

  public SetColor(c) {
    this.CTX.fillStyle = c;
  }

  public RenderLinearGeoGraph(coords: {
    mapped: [number, number][];
    unmapped: [number, number][];
  }) {
    const origin = coords.unmapped[0];
    this.DrawPoint(origin, 10);
    for (let i = 1; i < coords.mapped.length; i++) {
      this.CTX.beginPath();
      this.GeoRasterizer({
        type: 'LineString',
        coordinates: [coords.unmapped[i - 1], coords.unmapped[i]],
      });
      this.CTX.stroke();
      this.DrawPoint(coords.mapped[i], 5);
    }
  }

  public RenderInterpolatedGeoGraph(coords: {
    origin: [number, number];
    interpolators;
  }) {
    this.DrawPoint(coords.origin, 10);
    this.Interpolator((t) => {
      for (let i = 1; i < coords.interpolators.length; i++) {
        this.CTX.beginPath();
        this.GeoRasterizer({
          type: 'LineString',
          coordinates: [coords.origin, coords.interpolators[i](t)],
        });
        this.CTX.stroke();
      }
    });
  }
  private lerp(x1:number,x2:number,t:number):number{
    return (1 - t) * x1 + t * x2;
  }

  public GeoZoom(bounds: any)
  {
    const [[x0, y0], [x1, y1]] = bounds()
    const scale = Math.min(8, 0.9 / Math.max((x1 - x0) / this.Canvas.width, (y1 - y0) / this.Canvas.height))
    let values = [
        [this.ZoomState.origin[0],x0],
        [this.ZoomState.origin[1],y0],
        [this.ZoomState.scale,scale]
        ].map(el=>(t)=>this.lerp(el[0],el[1],t))

    this.Interpolator((t)=>{
        this.SetColor("blue")
        this.CTX.fillRect(0,0,this.Canvas.width,this.Canvas.height)
        let v = values.map(el=>el(t))
        this.CTX.translate(this.Canvas.width/2,this.Canvas.height/2)
        this.CTX.translate(v[0],v[1])
        this.CTX.scale(v[2],v[2])
        this.CTX.translate(-(v[0]),-(v[1]))
        this.Render();
        this.CTX.setTransform(1, 0, 0, 1, 0, 0);
    })
    this.ZoomState.origin = [values[0](1),values[1](1)]
    this.ZoomState.scale = values[2](1)
    }
}
