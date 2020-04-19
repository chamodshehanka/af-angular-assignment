import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { BannerComponent } from './components/banner/banner.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import {
  NgbModalModule,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    CalendarComponent,
    BannerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    BrowserAnimationsModule,
    FormsModule,
    FlatpickrModule.forRoot(),
    NgbModalModule,
    NgbDatepickerModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
