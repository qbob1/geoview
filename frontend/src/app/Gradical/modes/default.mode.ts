import { IGradicalSettings, IGradicalAnimation, IGradicalColorProfile } from '../interfaces/IGradicalSettings'
import { RenderInterpolatedLinearGeoGraph } from '../animations/RenderInterpolatedLinearGeoGraph';
import {Topology} from 'topojson-specification'
import * as usa from '../data/usa.json';
import * as world from '../data/data.json';
import * as t from 'topojson-client';
import { RenderInterpolatedGeoGraph } from '../animations/RenderInterpolatedGeoGraph';

export class MapPreset {
    public Settings: IGradicalSettings;
    constructor(config: IGradicalSettings){
        this.Settings = config;
    }
}

export const Default = new MapPreset({
    IsInteractive: false,
    ColorProfile:{
        BgColor:"Blue",
        ConnectionColor:"Pink", 
        LandColor:"Green", 
        MarkerColor:"#ffff99",
        IndicatorColor:"Red"
    },
    Projection:"geoMercator",
    Animation:RenderInterpolatedGeoGraph,
    Setup:()=>{
        let w = world.default as any
        return {
            Land:t.feature(w, w.objects.land),
            Features:w.objects.countries.geometries.slice(1,20).map(el=>t.feature(w, el))
        }
    }
})

export const Different = new MapPreset({
    IsInteractive: false,
    ColorProfile:{
        BgColor:"#7fc97f",
        LandColor:"#beaed4",
        ConnectionColor:"#fdc086",
        MarkerColor:"#ffff99",
        IndicatorColor:"#386cb0"
    },
    Projection:"geoMercator",
    Animation:RenderInterpolatedLinearGeoGraph,
    Setup:()=>{
        let us = (usa.default as unknown) as any
        us.objects.states.geometries = us.objects.states.geometries.filter(function(d) {
            return d.id !== 2 // AK
              && d.id !== 15 // HI
              && d.id < 60; // outlying areas
          })
        return {
            Land:t.feature(us, {
                type: "GeometryCollection",
                geometries: us.objects.states.geometries
            }),
                Features:us.objects.states.geometries.slice(15,19).map(el=>t.feature(us, el))
        }
    }
})

