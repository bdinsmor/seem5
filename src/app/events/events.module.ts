import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FullCalendarModule } from "ng-fullcalendar";
import { EventsRoutingModule } from "./events-routing.module";
import { EventsComponent } from "./events.component";

@NgModule({
  declarations: [EventsComponent],
  imports: [CommonModule, FullCalendarModule, EventsRoutingModule],
  exports: [EventsComponent],
  entryComponents: [EventsComponent]
})
export class EventsModule {}
