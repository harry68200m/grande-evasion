import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GetApiService } from '../services/get-api.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HistoryModalComponent } from './history-modal/history-modal.component';
import { AddModalComponent } from './add-modal/add-modal.component';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Device } from '@ionic-native/device/ngx';
import { Badge } from '@ionic-native/badge/ngx';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';



const config: SocketIoConfig = { url: 'http://notiffilrouge404.thfr.studio', options: {} };




@NgModule({
  declarations: [AppComponent, HistoryModalComponent, AddModalComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule,SocketIoModule.forRoot(config), CommonModule, FormsModule, ReactiveFormsModule],
  providers: [GetApiService, HttpClient, LocalNotifications,BackgroundMode, Device, Badge, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule {}
