import { IGradical } from '../interfaces/IGradical'
import { IRasterizer } from '../interfaces/IRasterizer'
import { DefaultAnimation } from './DefaultAnimation'
export function RenderGeoGraph(gradical:IGradical){
    gradical.Rasterizer.AddLayer(DefaultAnimation(gradical))
    return (Rasterizer: IRasterizer)=>{
        const nodes = gradical.PreRenderGraph(gradical.Features)
        Rasterizer.SetColor(gradical.Settings.ColorProfile.ConnectionColor)
        Rasterizer.RenderGeoGraph(nodes)
    }
}