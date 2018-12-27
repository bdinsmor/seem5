import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";

import { MapRoutingModule } from "./map-routing.module";
import { MapComponent } from "./map.component";
import { MatSidenavModule, MatButtonModule } from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatButtonModule,
    MapRoutingModule,
    LeafletModule.forRoot()
  ],
  exports: [MapComponent],
  entryComponents: [MapComponent]
})
export class MapModule {}
