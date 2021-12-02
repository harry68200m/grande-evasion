import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GetApiService } from 'src/services/get-api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  tableRooms: Array<any> = [];
  isLoaded = false

  constructor(private router: Router, private getAPI: GetApiService) {}

  ngOnInit() {
    this.getRooms()
  }

  getRooms() {
    this.getAPI.rooms().then((response: any) => {
     this.tableRooms = response.datas.rooms;
     this.isLoaded = true

   });

 }

  roomDetail(id){
    this.router.navigate(['room', id]);
  }

  

}
