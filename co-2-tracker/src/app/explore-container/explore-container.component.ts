import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements AfterViewInit {
  @Input() name: string;
  @ViewChild('myCanvas') myCanvas: ElementRef;
  public context: CanvasRenderingContext2D;

  chart: any;
  colorArray: any;
  constructor() {}

  ngAfterViewInit() {
    this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
    this.chart = new Chart(<HTMLCanvasElement>this.myCanvas.nativeElement, {
        type: 'line',
        data: {
          labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
          datasets: [{
              label: 'Salle 1',
              data: [500, 800, 700, 700, 620, 750, 700, 700, 620, 750],
              borderColor: 'rgba(0, 0, 255, 1)',
              borderWidth: 2,
              tension: 0.1
          },
          {
            label: 'Salle 2',
            data: [450, 650, 470, 500, 900, 650, 700, 900, 520, 650],
            borderColor: 'rgba(0, 100, 0, 1)',
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
}
