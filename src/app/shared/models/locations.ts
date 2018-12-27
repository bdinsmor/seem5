import { LatLng, LatLngBounds } from "leaflet";

export interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

export class LeafletLocation {
  latlng: LatLng;
  address: string;
  viewBounds: LatLngBounds;
}

export interface Location {
  id: string;
  categories: string;
  lat: number;
  lng: number;
  viewport?: Object;
  title: string;
  zoom: number;
  address_level_1?: string;
  address_level_2?: string;
  address_country?: string;
  address_zip?: string;
  address_state?: string;
  marker?: Marker;
  details: any;
}
