import { LayoutModule } from "@angular/cdk/layout";
import { CommonModule, registerLocaleData } from "@angular/common";
import en from "@angular/common/locales/en";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import {
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule
} from "@angular/material";
import { RouterModule, Routes } from "@angular/router";
import { en_US, NgZorroAntdModule, NZ_I18N } from "ng-zorro-antd";

import { EventsComponent } from "../events/events.component";
import { LocationsComponent } from "../locations/locations.component";
import { MapComponent } from "../map/map.component";
import { PeopleComponent } from "../people/people.component";
import { HomeComponent } from "./home.component";

registerLocaleData(en);
const appRoutes: Routes = [
  { path: "map", component: MapComponent },
  { path: "people", component: PeopleComponent },
  { path: "locations", component: LocationsComponent },
  { path: "events", component: EventsComponent }
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    LayoutModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    NgZorroAntdModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  exports: [HomeComponent],
  entryComponents: [HomeComponent]
})
export class HomeModule {}
