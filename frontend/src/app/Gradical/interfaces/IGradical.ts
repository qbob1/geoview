import { IGradicalSettings } from './IGradicalSettings';
import { IRasterizer } from './IRasterizer';

export interface IGradical
{
    Features:any[];
    ScaleTranslate(bounds:[[number,number],[number,number]]):{scale:(t)=>number,bounds: [[number, number],[number, number]]} //take in feature
    Init(canvas:HTMLCanvasElement):void;
    Land:any;
    PreRenderGraph(array_of_features:any[]):{unmapped:any[],mapped:any[]};
    Rasterizer:IRasterizer;
    Settings:IGradicalSettings;
    GeoPath:any;
}