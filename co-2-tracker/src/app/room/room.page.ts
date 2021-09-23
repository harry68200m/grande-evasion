import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: 'room.page.html',
  styleUrls: ['room.page.scss']
})
export class RoomPage {

  roomID: number;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.roomID = this.activatedRoute.snapshot.params['id'];
  }

}
