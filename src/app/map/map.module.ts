import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { MapRoutingModule } from './map-routing.module';
import { MapComponent } from './map.component';

@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule,
    MapRoutingModule,
    LeafletModule.forRoot(),
    AgmCoreModule.forRoot({ apiKey: "AIzaSyA6j5cBJN-pIetAHWVBttgypZqOdUSllQ4" })
  ],
  providers: [GoogleMapsAPIWrapper],
  exports: [MapComponent],
  entryComponents: [MapComponent]
})
export class MapModule {}
