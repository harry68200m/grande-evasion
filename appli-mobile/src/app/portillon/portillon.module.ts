import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortillonPage } from './portillon.page';

import { PortillonPageRoutingModule } from './portillon-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: PortillonPage }]),
    PortillonPageRoutingModule,
  ],
  declarations: [PortillonPage]
})
export class PortillonPageModule {}
