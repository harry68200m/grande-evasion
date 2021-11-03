import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Chart } from 'chart.js';
import { GetApiService } from 'src/services/get-api.service';
import { HistoryModalComponent } from '../history-modal/history-modal.component';

@Component({
  selector: 'app-room',
  templateUrl: 'room.page.html',
  styleUrls: ['room.page.scss']
})
export class RoomPage {
  @ViewChild('myCanvas') myCanvas: ElementRef;
  
  public context: CanvasRenderingContext2D;
  public date: string = new Date().toISOString();

  chart: any;
  roomID: number;
  roomData: any;
  currentModal = null;
  

  constructor(private activatedRoute: ActivatedRoute, private modalController : ModalController, private getAPI: GetApiService) {}

  async ngOnInit() {
    this.roomID = this.activatedRoute.snapshot.params['id'];
    await this.getRoomData()
  }

  ngAfterViewInit() {
    this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
    this.chart = new Chart(<HTMLCanvasElement>this.myCanvas.nativeElement, {
        type: 'line',
        data: {
          labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
          datasets: [{
              label: 'Taux de CO2',
              data: [500, 800, 700, 700, 620, 750, 700, 700, 620, 750],
              borderColor: 'rgba(0, 0, 255, 1)',
              borderWidth: 2,
              tension: 0.1
          }]
        },
        options: {
          scales: {
              y: {
                  min: 400,
                  max: 1000
              }
          }
      }
      });

    console.log(this.chart);
  }

  getRoomData() {
    console.log(this.roomID)
    this.getAPI.room(this.roomID).then((response: any) => {
    this.roomData = response.datas;
    console.log(this.roomData)
   });
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: HistoryModalComponent,
      componentProps: { homeref: this, roomID: this.roomID},
      swipeToClose: true,
    });
    this.currentModal = modal;
    return await modal.present();
  }

  dismissModal() {
    if (this.currentModal) {
      this.currentModal.dismiss().then(() => {
        this.currentModal = null;
      });
    }
  }

}
