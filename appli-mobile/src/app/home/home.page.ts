import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { GetApiService } from 'src/services/get-api.service';
import { AddModalComponent } from '../add-modal/add-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  tablePortillons: Array<any> = [];
  isLoaded = false
  currentModal = null;


  constructor(private router: Router, private getAPI: GetApiService, private modalController : ModalController) {}

  ngOnInit() {
    this.getPortillons()
  }

  getPortillons() {
    this.getAPI.rooms().then((response: any) => {
     this.tablePortillons = response.datas.rooms;
     this.isLoaded = true
   });

 }

  portillonDetail(id){
    this.router.navigate(['portillon', id]);
  }

  async presentModalAdd() {
    const modal = await this.modalController.create({
      component: AddModalComponent,
      componentProps: { homeref: this },
      swipeToClose: true,
    });
    this.currentModal = modal;
    return await modal.present()
  }

  dismissModal() {
    if (this.currentModal) {
      this.currentModal.dismiss().then(() => {
        this.currentModal = null;
      });
    }
  }

  

}
