import { CommonModule, registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NgModule } from '@angular/core';
import { en_US, NgZorroAntdModule, NZ_I18N } from 'ng-zorro-antd';

import { PeopleRoutingModule } from './people-routing.module';
import { PeopleComponent } from './people.component';

registerLocaleData(en);

@NgModule({
  declarations: [PeopleComponent],
  imports: [CommonModule, PeopleRoutingModule, NgZorroAntdModule],
  exports: [PeopleComponent],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  entryComponents: [PeopleComponent]
})
export class PeopleModule {}
