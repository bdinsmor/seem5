import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild
} from "@angular/core";
import { CalendarComponent } from "ng-fullcalendar";
import { Options } from "fullcalendar";
import { EventsService } from "../shared/services/events.service";
@Component({
  selector: "app-events",
  templateUrl: "./events.component.html",
  styleUrls: ["./events.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsComponent implements OnInit {
  events = [];
  displayEvent: any;
  calendarOptions: Options;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

  constructor(private eventService: EventsService) {}

  ngOnInit() {
    this.eventService.getEvents().subscribe(data => {
      this.events = data;
      this.calendarOptions = {
        editable: true,
        eventLimit: false,
        header: {
          left: "prev,next today",
          center: "title",
          right: "month,agendaWeek,agendaDay,listMonth"
        },
        selectable: true,
        events: this.events
      };
    });
  }
  clearEvents() {
    this.events = [];
  }
  loadEvents() {
    this.eventService.getEvents().subscribe(data => {
      this.events = data;
    });
  }

  clickButton(model: any) {
    this.displayEvent = model;
  }
  eventClick(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title,
        allDay: model.event.allDay
        // other params
      },
      duration: {}
    };
    this.displayEvent = model;
  }
  updateEvent(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title
        // other params
      },
      duration: {
        _data: model.duration._data
      }
    };
    this.displayEvent = model;
  }
}
