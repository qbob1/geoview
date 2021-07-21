import { IPreset } from './IPreset';
import { IGradicalProjection } from './IGradicalProjection';
import { IGradical } from './IGradical';

export interface IGradicalSettings {
  Animation: any;
  ColorProfile: IGradicalColorProfile;
  IsInteractive: boolean;
  Setup:()=>{Land:any,Features:any}
  Projection?: string//keyof IGradicalProjection;
}

export interface IGradicalAnimation{
    ColorInterpolator:d3.ColorGammaInterpolationFactory;
    Duration:number;
}

export interface IGradicalColorProfile{
    BgColor:string;
    ConnectionColor:string;
    LandColor:string;
    MarkerColor:string;
    IndicatorColor:string
}

