import { Gradical } from '../Gradical'
import { IGradical } from '../interfaces/IGradical'
import { IRasterizer } from '../interfaces/IRasterizer'

export function DefaultAnimation(gradical:IGradical){
    return (Rasterizer: IRasterizer)=>{
        //Rasterizer.RenderBackground("clear")
        Rasterizer.SetColor(gradical.Settings.ColorProfile.LandColor)
        Rasterizer.RasterizeGeoJSONFilled(gradical.Land)
        Rasterizer.SetColor(gradical.Settings.ColorProfile.MarkerColor)
        gradical.Features.forEach(el=>Rasterizer.RasterizeGeoJSONFilled(el))
    }
}