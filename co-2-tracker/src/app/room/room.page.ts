import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { HistoryModalComponent } from '../history-modal/history-modal.component';

@Component({
  selector: 'app-room',
  templateUrl: 'room.page.html',
  styleUrls: ['room.page.scss']
})
export class RoomPage {

  roomID: number;
  currentModal = null;

  constructor(private activatedRoute: ActivatedRoute, private modalController : ModalController) {}

  ngOnInit() {
    this.roomID = this.activatedRoute.snapshot.params['id'];
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
