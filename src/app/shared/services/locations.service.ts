import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Location } from '../models/locations';

@Injectable({
  providedIn: "root"
})
export class LocationsService {
  constructor(private httpClient: HttpClient) {}
  /*export interface Location {
  lat: number;
  lng: number;
  viewport?: Object;
  zoom: number;
  address_level_1?: string;
  address_level_2?: string;
  address_country?: string;
  address_zip?: string;
  address_state?: string;
  marker?: Marker;
}*/

  getLocations(): Observable<Location[]> {
    return this.httpClient
      .get("https://randomuser.me/api/?format=json&results=5")
      .pipe(
        map((data: any) => {
          const results = data.results;
          let locations: Location[] = [];
          locations = results.map((d: any) => {
            return {
              title:
                d.location.street +
                ", " +
                d.location.city +
                ", " +
                d.location.state,
              lat: Number(+d.location.coordinates.latitude),
              lng: Number(+d.location.coordinates.longitude),
              zoom: 5
            } as Location;
          });
          return locations;
        })
      );
  }
}
