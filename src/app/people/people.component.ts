import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { PeopleService } from '../shared/services/people.service';

@Component({
  selector: "app-people",
  templateUrl: "./people.component.html",
  styleUrls: ["./people.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeopleComponent implements OnInit {
  dataSet = [];
  constructor(
    private cdr: ChangeDetectorRef,
    private peopleService: PeopleService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.peopleService.getPeople().subscribe(people => {
      this.dataSet = people;
      this.cdr.detectChanges();
    });
  }
}
