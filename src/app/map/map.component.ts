import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  NgZone,
  OnInit,
  ViewChild
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { icon, latLng, Layer, marker, tileLayer } from "leaflet";

import { Location } from "../shared/models/locations";
import { LocationsService } from "../shared/services/locations.service";
import { MatSidenav } from "@angular/material";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit {
  @ViewChild("mapDetails") mapDetails: MatSidenav;
  geocoder: any;
  public latitude: Number = 50.110573;
  public longitude: Number = 8.684966;
  public searchControl: FormControl;
  public zoom: number;
  markers: Layer[] = [];
  locations: Location[] = [];
  selectedLocation: Location;

  options = {
    layers: [
      tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors"
      })
    ],
    zoom: 15,
    center: latLng([this.latitude as number, this.longitude as number])
  };

  constructor(
    private locationsService: LocationsService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.generatePoints();
  }

  generatePoints() {
    this.locationsService
      .getGoogleLocations(String(this.latitude), String(this.longitude))
      .subscribe((locations: Location[]) => {
        this.locations = locations;
        locations.map((location: Location) => {
          const newMarker = marker([location.lat, location.lng], {
            icon: icon({
              iconSize: [25, 41],
              iconAnchor: [13, 41],
              iconUrl: "leaflet/marker-icon.png",
              shadowUrl: "leaflet/marker-shadow.png"
            })
          }).on("click", this.showPopup.bind(this));
          this.markers.push(newMarker);
          this.cdr.detectChanges();
        });
        this.cdr.detectChanges();
      });
  }

  showPopup(event): void {
    const coords = event.latlng;
    const location = this.findLocation(coords.lat, coords.lng);
    this.locationsService
      .getLocationDetails(location)
      .subscribe((details: Location) => {
        console.log("details: " + JSON.stringify(details, null, 2));
        this.selectedLocation = details;
        this.mapDetails.open();
        this.cdr.detectChanges();
      });
  }

  findLocation(lat: string, lng: string) {
    const coords = lat + "," + lng;
    let location: Location = null;
    for (let i = 0; i < this.locations.length; i++) {
      const l = this.locations[i];
      const latlng = l.lat + "," + l.lng;
      //    console.log(latlng + " === " + coords);
      if (latlng === coords) {
        location = l;
        break;
      }
    }

    return location;
  }
}
