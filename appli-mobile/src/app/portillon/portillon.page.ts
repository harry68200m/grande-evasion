import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { GetApiService } from 'src/services/get-api.service';
import { HistoryModalComponent } from '../history-modal/history-modal.component';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications';
import { Device } from '@ionic-native/device/ngx';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-portillon',
  templateUrl: 'portillon.page.html',
  styleUrls: ['portillon.page.scss'],
})
export class PortillonPage {
  public date: string = new Date().toISOString();

  chart: any;
  portillonID: number;
  portillonData: any;
  currentModal = null;
  chartData:any = [];
  notifActivated = false;
  isLoaded = false



  constructor(
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private getAPI: GetApiService,
    private device: Device,
    private alertController : AlertController,
    private navCtrl : NavController,
    private localNotifications : LocalNotifications
  ) {}

  async ngOnInit() {
    this.portillonID = this.activatedRoute.snapshot.params['id'];
    await this.getRoomData();
  }

  async getRoomData() {
    console.log(this.portillonID);
    await this.getAPI.portillon(this.portillonID).then((response: any) => {
      this.portillonData = response.datas[0]
      if (this.portillonData.uuid.includes(this.device.uuid)){
        this.notifActivated = true
      }     
      this.isLoaded = true
    })
    console.log(this.portillonData)
  }

  registerDevice () {
    console.log(this.device.uuid)
    this.getAPI.registerDeviceToRoom(this.portillonID, this.device.uuid)
    this.notifActivated = true
  }

  unregisterDevice () {
    console.log(this.device.uuid)
    this.getAPI.unregisterDeviceToRoom(this.portillonID, this.device.uuid)
    this.notifActivated = false
  }

  async presentAlertConfirmUnregister() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation de d??sincription',
      message: 'Etes-vous certains de vouloir vous d??sabonner des notifications de cette salle ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Confirmer',
          handler: () => {
            this.unregisterDevice()
          }
        }
      ]
    });

    await alert.present();
  }
  
  enableNotif () {
    this.registerDevice()
    this.localNotifications.schedule({
    title: 'Notifications activ??es pour ' + this.portillonData.nom,
    text: 'Vous serez alert?? en cas d\'ouverture du portillon',
    foreground: true})
  }


  async presentModal() {
    const modal = await this.modalController.create({
      component: HistoryModalComponent,
      componentProps: { homeref: this, portillon: this.portillonData },
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

  goBack() {
    this.navCtrl.back();
  }
}
