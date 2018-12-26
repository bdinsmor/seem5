import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FullCalendarModule } from "ng-fullcalendar";
import { EventsRoutingModule } from "./events-routing.module";
import { EventsComponent } from "./events.component";
import { MatSidenavModule, MatButtonModule } from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  declarations: [EventsComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatButtonModule,
    FullCalendarModule,
    EventsRoutingModule
  ],
  exports: [EventsComponent],
  entryComponents: [EventsComponent]
})
export class EventsModule {}
