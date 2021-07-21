import { IGradical } from '../interfaces/IGradical';
import { IRasterizer } from '../interfaces/IRasterizer';
import { DefaultAnimation } from './DefaultAnimation';
import * as d3 from 'd3';

export function RenderInterpolatedLinearGeoGraph(gradical: IGradical) {
  return (Rasterizer: IRasterizer) => {
    Rasterizer.AddLayer(DefaultAnimation(gradical));
    const countries = gradical.PreRenderGraph(gradical.Features);
    const interpolators = []
    for(let i = 0; i<countries.unmapped.length-1; i++){
        interpolators.push((t)=>
            Rasterizer.RasterizeGeoJSONStroked(
                {type: "LineString", 
                coordinates: [countries.unmapped[i],
                    d3.geoInterpolate(countries.unmapped[i], countries.unmapped[i+1])(t)]
            })
        )
        
        interpolators.push((t)=>{
        Rasterizer.SetColor(gradical.Settings.ColorProfile.IndicatorColor);
        Rasterizer.DrawPoint(countries.mapped[i+1],t*10)
        })

    }
    return Rasterizer.InterpolatorSeries(interpolators)
}
}