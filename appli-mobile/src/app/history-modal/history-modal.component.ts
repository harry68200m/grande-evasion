import { Component, Input, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { GetApiService } from 'src/services/get-api.service';

@Component({
  selector: 'app-history-modal',
  templateUrl: './history-modal.component.html',
  styleUrls: ['./history-modal.component.scss'],
})
export class HistoryModalComponent implements OnInit {

  @Input()
  portillon: any;
  events: any;
 
  constructor(public navParams : NavParams, private API : GetApiService) { }

   ngOnInit() {
    this.getEvents()
  }


  getEvents() {
    this.API.events(this.portillon.id).then((response: any) => {
     this.events = response.datas;
     console.log(this.events)
   });

  }

}
