import { AgmMap, MapsAPILoader } from '@agm/core';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';

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
  public location: Location = {
    lat: 51.678418,
    lng: 7.809007,
    marker: {
      lat: 51.678418,
      lng: 7.809007,
      draggable: true
    },
    zoom: 5
  };

  lat = 51.673858;
  lng = 7.815982;
  numPoints = 500;
  points: Location[];

  @ViewChild(AgmMap) map: AgmMap;

  constructor(
    private locationsService: LocationsService,
    public mapsApiLoader: MapsAPILoader,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.location.marker.draggable = true;
    this.generatePoints();
  }

  generatePoints() {
    this.locationsService.getLocations().subscribe((locations: Location[]) => {
      this.points = locations;
      this.cdr.detectChanges();
    });
  }
  markerDragEnd(m: any, $event: any) {
    this.location.marker.lat = m.coords.lat;
    this.location.marker.lng = m.coords.lng;
    this.findAddressByCoordinates();
  }

  findAddressByCoordinates() {
    this.geocoder.geocode(
      {
        location: {
          lat: this.location.marker.lat,
          lng: this.location.marker.lng
        }
      },
      (results, status) => {
        this.decomposeAddressComponents(results);
      }
    );
  }
  decomposeAddressComponents(addressArray) {
    if (addressArray.length === 0) return false;
    const address = addressArray[0].address_components;

    for (const element of address) {
      if (element.length === 0 && !element["types"]) continue;

      if (element["types"].indexOf("street_number") > -1) {
        this.location.address_level_1 = element["long_name"];
        continue;
      }
      if (element["types"].indexOf("route") > -1) {
        this.location.address_level_1 += ", " + element["long_name"];
        continue;
      }
      if (element["types"].indexOf("locality") > -1) {
        this.location.address_level_2 = element["long_name"];
        continue;
      }
      if (element["types"].indexOf("administrative_area_level_1") > -1) {
        this.location.address_state = element["long_name"];
        continue;
      }
      if (element["types"].indexOf("country") > -1) {
        this.location.address_country = element["long_name"];
        continue;
      }
      if (element["types"].indexOf("postal_code") > -1) {
        this.location.address_zip = element["long_name"];
        continue;
      }
    }
  }
}
