import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Location } from "../models/locations";

@Injectable({
  providedIn: "root"
})
export class LocationsService {
  apiKey = "AIzaSyApgsuRc9wPeTMAMKzMU9Hy2D5Nx1Lzqx0";
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

  // google api key:  AIzaSyApgsuRc9wPeTMAMKzMU9Hy2D5Nx1Lzqx0

  // foursquare: 1WLR3M2HUDEKX0AAYLOFJHUUJBZ5LGR3TBUC1SRBBVATJRRI

  // fs secret:  QJE0CSFNE1AFI1EIDHQCIYKFKJWRMWQ30RVCB2FZ0IGBK15M
}*/

  getGoogleLocations(
    latitude: string,
    longitude: string
  ): Observable<Location[]> {
    /*
        client_id: 'CLIENT_ID',
    client_secret: 'CLIENT_SECRET',
    ll: '40.7243,-74.0018',
    query: 'coffee',
    v: '20180323',
    limit: 1

    */

    const params = new HttpParams()
      .set("client_id", "1WLR3M2HUDEKX0AAYLOFJHUUJBZ5LGR3TBUC1SRBBVATJRRI")
      .set("client_secret", "QJE0CSFNE1AFI1EIDHQCIYKFKJWRMWQ30RVCB2FZ0IGBK15M")
      .set("ll", latitude + "," + longitude)
      .set("query", "restaurant")
      .set("v", "20180323")
      .set("limit", "500");

    return this.httpClient
      .get("https://api.foursquare.com/v2/venues/explore", { params })
      .pipe(
        map((data: any) => {
          //   console.log("response: " + JSON.stringify(data, null, 2));
          const results = data.response.groups[0].items;
          let locations: Location[] = [];
          locations = results.map((d: any) => {
            return {
              id: d.venue.id,
              title: d.venue.name,
              lat: +Number(+d.venue.location.lat).toFixed(6),
              lng: +Number(+d.venue.location.lng).toFixed(6),
              categories: d.venue.categories,
              zoom: 5
            } as Location;
          });
          return locations;
        })
      );
  }

  getLocationDetails(location: Location): Observable<Location> {
    const params = new HttpParams()
      .set("client_id", "1WLR3M2HUDEKX0AAYLOFJHUUJBZ5LGR3TBUC1SRBBVATJRRI")
      .set("client_secret", "QJE0CSFNE1AFI1EIDHQCIYKFKJWRMWQ30RVCB2FZ0IGBK15M")
      .set("v", "20180323");
    return this.httpClient
      .get("https://api.foursquare.com/v2/venues/" + location.id, { params })
      .pipe(
        map((data: any) => {
          const venue = data.response.venue;
          const details = location as Location;
          details.details = venue;
          //console.log("venue details: " + JSON.stringify(details, null, 2));
          return details;
        })
      );
  }

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
