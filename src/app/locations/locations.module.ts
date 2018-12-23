import { CommonModule, registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NgModule } from '@angular/core';
import { en_US, NgZorroAntdModule, NZ_I18N } from 'ng-zorro-antd';

import { LocationsRoutingModule } from './locations-routing.module';
import { LocationsComponent } from './locations.component';

registerLocaleData(en);

@NgModule({
  declarations: [LocationsComponent],
  imports: [CommonModule, NgZorroAntdModule, LocationsRoutingModule],
  exports: [LocationsComponent],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  entryComponents: [LocationsComponent]
})
export class LocationsModule {}
