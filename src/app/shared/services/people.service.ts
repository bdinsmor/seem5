import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Person } from '../models/person';

@Injectable({
  providedIn: "root"
})
export class PeopleService {
  constructor(private httpClient: HttpClient) {}

  getPeople(): Observable<Person[]> {
    return this.httpClient
      .get("https://randomuser.me/api/?format=json&results=500")
      .pipe(
        map((data: any) => {
          const results = data.results;
          let people: Person[] = [];
          people = results.map((d: any) => {
            return d as Person;
          });

          return people;
        })
      );
  }
}
