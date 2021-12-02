import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortillonPage } from './portillon.page';

const routes: Routes = [
  {
    path: '',
    component: PortillonPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortillonPageRoutingModule {}
