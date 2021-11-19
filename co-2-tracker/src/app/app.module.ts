import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GetApiService } from '../services/get-api.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HistoryModalComponent } from './history-modal/history-modal.component';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Device } from '@ionic-native/device/ngx';
import { Badge } from '@ionic-native/badge/ngx';





@NgModule({
  declarations: [AppComponent, HistoryModalComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [GetApiService, HttpClient, LocalNotifications, Device, Badge, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
