import { Component, Input, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss'],
})
export class AddModalComponent implements OnInit {

  @Input()
  chartData: any;
  CO2Measures= [];
  CamMeasures= [];
  Values= [];

  constructor(public navParams : NavParams) { }

   ngOnInit() {
    this.chartData.sort((a, b) => parseFloat(b.startTimestamp) - parseFloat(a.startTimestamp));    
    console.log(this.chartData)
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
