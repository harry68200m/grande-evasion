import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Chart } from 'chart.js';
import { GetApiService } from 'src/services/get-api.service';
import { HistoryModalComponent } from '../history-modal/history-modal.component';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications';
import { Device } from '@ionic-native/device/ngx';

@Component({
  selector: 'app-room',
  templateUrl: 'room.page.html',
  styleUrls: ['room.page.scss'],
})
export class RoomPage {
  @ViewChild('myCanvas') myCanvas: ElementRef;

  public context: CanvasRenderingContext2D;
  public date: string = new Date().toISOString();

  chart: any;
  roomID: number;
  roomData: any;
  currentModal = null;
  chartData:any = [];
  notifActivated = false;
  isLoaded = false



  constructor(
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private getAPI: GetApiService,
    private localNotifications: LocalNotifications,
    private device: Device,
    private alertController : AlertController
  ) {}

  async ngOnInit() {
    this.roomID = this.activatedRoute.snapshot.params['id'];
    await this.getRoomData();
  }

  async getRoomData() {
    console.log(this.roomID);
    await this.getAPI.room(this.roomID).then((response: any) => {
      this.roomData = response.datas
      if (this.roomData.registeredUuid.includes(this.device.uuid)){
        this.notifActivated = true
      }
    })
  
    let nowDate = Math.floor(Date.now() / 1000)
    await this.getAPI.getRoomDatasByPeriode(this.roomID, nowDate - 3600, nowDate ).then((response: any) => {
      this.chartData = response.datas;
      this.context = (<HTMLCanvasElement>(
        this.myCanvas.nativeElement
      )).getContext('2d');
      this.chart = new Chart(<HTMLCanvasElement>this.myCanvas.nativeElement, this.chartDatas());
      this.isLoaded = true
    });
    console.log(this.chartData)
  }

  registerDevice () {
    this.getAPI.registerDeviceToRoom(this.roomID, this.device.uuid)
    this.notifActivated = true
  }

  unregisterDevice () {
    this.getAPI.unregisterDeviceToRoom(this.roomID, this.device.uuid)
    this.notifActivated = false
  }

  async presentAlertConfirmUnregister() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation de désincription',
      message: 'Etes-vous certains de vouloir vous désabonner des notifications de cette salle ?',
      buttons: [
        {
          text: 'Annule',
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
    title: 'Notifications activées pour ' + this.roomData.name,
    text: 'Vous serez alerté si le seuil de CO2 dépasse la valeur recommandée',
    foreground: true})

    setTimeout(() =>{
      this.localNotifications.schedule({
        title: 'Merci d\'aérer la ' + this.roomData.name,
        text: 'Le taux de CO2 est de ' + this.getLastValue('CO2') + ' ppm',
        trigger: {in:10,unit:ELocalNotificationTriggerUnit.SECOND},
        foreground: true}
      );
     }, 3000);
  }

  chartDatas(): any{
    var chartData =  {
      type: 'line',
      data: {
          labels: [],
          datasets: []
      },
      options: {
          scales: {
            CO2: {
              type: 'linear',
              position: 'left',
            },
            Webcam: {
              type: 'linear',
              position: 'right',
              ticks: {
                stepSize: 1
              }                        
            }
          }
      }
    }

    var timestamps = [];
    var co2Values = [];
    var webcamValues = [];
    this.chartData.forEach(valueBlock => {
      timestamps.push(valueBlock.startTimestamp)
        co2Values.push(valueBlock.co2);
        webcamValues.push(valueBlock.webcam);
    });

  if (!co2Values.every(v => v === null)) {
      chartData.data.datasets.push({
      label: "CO2",
      data: co2Values,
      borderColor: this.getRandomColor(),
      yAxisID: "CO2",
      borderWidth: 2,
      tension: 0.1
    });
    }
   
    if (!webcamValues.every(v => v === null)) {
      chartData.data.datasets.push({
      label: "Webcam",
      data: webcamValues,
      borderColor: this.getRandomColor(),
      yAxisID: "Webcam",
      borderWidth: 2,
      tension: 0.1
    }); 
    }
   

    chartData.data.labels = timestamps.map(t => new Date(t*1000).toLocaleTimeString('fr-FR'));

    return chartData;
  }


  getLastValue(type){
    var lastValue; 
    if(type == 'CO2' && this.chartData[this.chartData.length - 1]){
      lastValue = this.chartData[this.chartData.length - 1].co2
    } 
    else if (type == 'CO2' && this.chartData[this.chartData.length - 1]){
      lastValue = this.chartData[this.chartData.length - 1].webcam
    }
    return lastValue
  }

  getRandomColor(){
      return 'rgba(' + Math.floor(Math.random() * 255) + ','  + Math.floor(Math.random() * 255) + ','  + Math.floor(Math.random() * 255) + ',1)';
  }  

  async presentModal() {
    const modal = await this.modalController.create({
      component: HistoryModalComponent,
      componentProps: { homeref: this, chartData: this.chartData },
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
