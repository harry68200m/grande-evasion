import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoomPage } from './room.page';

import { RoomPageRoutingModule } from './room-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: RoomPage }]),
    RoomPageRoutingModule,
  ],
  declarations: [RoomPage]
})
export class RoomPageModule {}
