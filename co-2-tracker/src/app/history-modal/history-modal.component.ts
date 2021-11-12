import { Component, Input, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-history-modal',
  templateUrl: './history-modal.component.html',
  styleUrls: ['./history-modal.component.scss'],
})
export class HistoryModalComponent implements OnInit {

  @Input()
  roomData: any;
  CO2Measures= [];
  CamMeasures= [];
  Values= [];

  constructor(public navParams : NavParams) { }

   ngOnInit() {
    console.log(this.roomData)
    this.regroupValues()
  }

  regroupValues (){
    if(this.roomData){
      this.roomData.sensors.forEach(sensor => {
        if (sensor.type == "CO2") {
        console.log(sensor)
        this.CO2Measures.push(sensor.values.slice(0,50))
        }
        else if (sensor.type == "Webcam") {
          this.CamMeasures.push(sensor.values.slice(0,50))
        }    
      });
    }   
    this.CO2Measures.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
    this.CamMeasures.sort((a, b) => a.timestamp.localeCompare(b.timestamp));

    console.log(this.CO2Measures)
  }

  getValueColor(value) {
    if(value < 1000 ) {
      return 'success'
    }
    else if (value > 1000 && value < 1500){
      return 'warning'
    }
    else return 'danger'
  }

}
