import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Chart } from 'chart.js';
import { GetApiService } from 'src/services/get-api.service';
import { HistoryModalComponent } from '../history-modal/history-modal.component';

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
  co2Values = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private getAPI: GetApiService
  ) {}

  async ngOnInit() {
    this.roomID = this.activatedRoute.snapshot.params['id'];
    await this.getRoomData();
  }

  async getRoomData() {
    console.log(this.roomID);
    await this.getAPI.room(this.roomID).then((response: any) => {
      this.roomData = response.datas;
      this.context = (<HTMLCanvasElement>(
        this.myCanvas.nativeElement
      )).getContext('2d');
      this.chart = new Chart(<HTMLCanvasElement>this.myCanvas.nativeElement, this.chartDatas());
    });
    console.log(this.roomData)
  }

  chartDatas() : any {
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

    this.roomData.sensors.forEach(sensor => {
      var chartValues = [];

      var sensorValues = [...sensor.values];

      sensorValues.sort((a, b) => a.timestamp - b.timestamp);

      sensorValues.forEach(value => {
        if (!timestamps.includes(value.timestamp)) {
          timestamps.push(value.timestamp);
        }        
        chartValues.push(value.value);
      });
      chartData.data.datasets.push({
        label: sensor.type + " - " + sensor.name,
        data: chartValues,
        borderColor: this.getRandomColor(),
        yAxisID: sensor.type,
        borderWidth: 2,
        tension: 0.1
      });
    });

    chartData.data.labels = timestamps.map(t =>  new Date(t*1000).toLocaleDateString('fr-FR') + ' ' + new Date(t*1000).toLocaleTimeString('fr-FR'));

    return chartData;
  }

  getLastValue(type){
    var lastValue = null;
    if(this.roomData){
      this.roomData.sensors.forEach(sensor => {
        if (sensor.type == type) {
          lastValue = sensor.values[0]?.value;
        }      
      });
    }   
    return lastValue
  }

  getRandomColor(){
      return 'rgba(' + Math.floor(Math.random() * 255) + ','  + Math.floor(Math.random() * 255) + ','  + Math.floor(Math.random() * 255) + ',1)';
  }  

  async presentModal() {
    const modal = await this.modalController.create({
      component: HistoryModalComponent,
      componentProps: { homeref: this, roomData: this.roomData },
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
