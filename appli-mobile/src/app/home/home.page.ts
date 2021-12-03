import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
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


  constructor(private router: Router, private API: GetApiService, private modalController : ModalController, private alertController : AlertController) {}

  ngOnInit() {
    this.getPortillons()
  }

  getPortillons() {
    this.API.portillons().then((response: any) => {
     this.tablePortillons = response.datas;
     this.isLoaded = true
   });

  }

 async deletePortillon(id) {
  await this.API.deletePortillon(id).then((response: any) => {
    console.log(response)
  })
  this.getPortillons()
}

  portillonDetail(id){
    this.router.navigate(['portillon', id]);
  }

  async presentModalAdd() {
    const modal = await this.modalController.create({
      component: AddModalComponent,
      componentProps: { homeref: this},
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

  async presentAlertDelete(id) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation de suppression',
      message: 'Etes-vous certains de vouloir supprimer ce portillon ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
          }
        }, {
          text: 'Supprimer',
          handler: () => {
            this.deletePortillon(id)
          }
        }
      ]
    });

    await alert.present();
  }

  

}
