import { Marker, LatLngExpression, MarkerOptions, marker } from "leaflet";

export interface Person {
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  dob: {
    date: string;
    age: Number;
  };
  phone: string;
  cell: string;
  id: {
    name: string;
    value: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}

export class CustomMarker<P = any> extends Marker {
  location: Location;
}

export function customMarker(
  latlng: LatLngExpression,
  options?: MarkerOptions
): Marker {
  return marker(latlng, options);
}
