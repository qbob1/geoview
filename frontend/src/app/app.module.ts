import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HdpiCanvasComponent } from './hdpi-canvas/hdpi-canvas.component';
import { QannabisMapComponent } from './qannabis-map/qannabis-map.component';
import { FeatureComponent } from './feature/feature.component';
import { PbarComponent } from './pbar/pbar.component';
import { ActionButtonComponent } from './action-button/action-button.component';
import { DataContainerComponent } from './data-container/data-container.component';
import { StyleProviderService } from './styleprovider.service';
import { LandingPageComponent } from './landing-page/landing-page.component'
import {HeaderComponent} from './header/header.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { SafContainerComponent } from './saf-container/saf-container.component';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    HdpiCanvasComponent,
    QannabisMapComponent,
    FeatureComponent,
    PbarComponent,
    ActionButtonComponent,
    DataContainerComponent,
    LandingPageComponent,
    HeaderComponent,
    SafContainerComponent,
    CardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSliderModule
  ],
  providers: [StyleProviderService],
  bootstrap: [AppComponent],
})
export class AppModule { }
