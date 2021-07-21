export interface IRasterizer {
  AddLayer(renderFunction);
  DrawInterpolatedLine(fn);
  DrawLine(a: [number, number], b: [number, number]);
  DrawPoint(vector: [number, number], radius: number);
  Interpolator(fn);
  InterpolatorSeries(fn:any[])
  RasterizeGeoJSONFilled(geoFeature);
  RasterizeGeoJSONStroked(geoFeature);
  RegisterAnimationFunction(animationFunction:any);
  RegisterGeoRasterizer(projection);
  Render();
  RenderBackground(color:string): void;
  RenderGeoGraph(coords: {
    mapped: [number, number][];
    unmapped: [number, number][];
  });
  RenderInterpolatedGeoGraph(coords:{origin:[number,number],interpolators:((t: number) => [number, number])[]})
  RenderPath(pathfn: any): void;
  SetColor(c): any;
  GeoZoom(bounds: any)
}