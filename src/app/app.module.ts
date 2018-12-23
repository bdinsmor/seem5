import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { en_US, NgZorroAntdModule, NZ_I18N } from 'ng-zorro-antd';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { EventsModule } from './events/events.module';
import { HomeModule } from './home/home.module';
import { LocationsModule } from './locations/locations.module';
import { MapModule } from './map/map.module';
import { PeopleModule } from './people/people.module';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    DashboardModule,
    EventsModule,
    LocationsModule,
    PeopleModule,
    CoreModule,
    MapModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    }),
    HomeModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
  entryComponents: [PageNotFoundComponent]
})
export class AppModule {}
