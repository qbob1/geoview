import { IGradical } from '../interfaces/IGradical';
import { IRasterizer } from '../interfaces/IRasterizer';
import { DefaultAnimation } from './DefaultAnimation';
import * as d3 from 'd3';

export function RenderInterpolatedGeoGraph(gradical: IGradical) {
  let zoomto = gradical.ScaleTranslate(gradical.Features[0])
  let zoomto2 = gradical.ScaleTranslate(gradical.Features[0])
  return (Rasterizer: IRasterizer) => {
    Rasterizer.AddLayer(DefaultAnimation(gradical));
    const countries = gradical.PreRenderGraph(gradical.Features);
    const interpolators = countries.unmapped
      .slice(0)
      .map((el) => d3.geoInterpolate(countries.unmapped[0], el));
    const coords = {
        origin: countries.unmapped[0],
        interpolators: interpolators,
      }
    //Rasterizer.SetColor(gradical.Settings.ColorProfile.ConnectionColor);
        const DrawLines = (t)=>{
            for(let i=1 ; i < coords.interpolators.length; i++){
                Rasterizer.RasterizeGeoJSONStroked({type: "LineString", coordinates: [coords.origin,coords.interpolators[i](t)]})
            }
        }
      const DrawPoints = (t) => {
        countries.mapped.forEach((el) => {
          Rasterizer.SetColor(gradical.Settings.ColorProfile.IndicatorColor)
          Rasterizer.DrawPoint(el, t * 5);
        })
    }
    Rasterizer.GeoZoom(zoomto2)
    //Rasterizer.GeoZoom(zoomto2)
    //return Rasterizer.InterpolatorSeries([DrawLines,DrawPoints])
}
}