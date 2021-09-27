import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-history-modal',
  templateUrl: './history-modal.component.html',
  styleUrls: ['./history-modal.component.scss'],
})
export class HistoryModalComponent implements OnInit {

  constructor(private navParams : NavParams) { }

  ngOnInit() {
  }

}
