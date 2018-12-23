
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { latLng, tileLayer } from 'leaflet';

import { Location } from '../shared/models/locations';
import { LocationsService } from '../shared/services/locations.service';

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit {
  geocoder: any;
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  options = {
    layers: [
      tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors"
      })
    ],
    zoom: 7,
    center: latLng([46.879966, -121.726909])
  };

  constructor(
    private locationsService: LocationsService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  generatePoints() {
    this.locationsService.getLocations().subscribe((locations: Location[]) => {
      this.cdr.detectChanges();
    });
  }
}
