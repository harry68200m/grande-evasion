import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GetApiService {

  ipAPI = environment.API_URL;

  constructor(private http: HttpClient) { }

  async rooms() {
    return new Promise((resolve, reject) => {
      this.http
        .get<any>(this.ipAPI + "/room/getAllRooms", {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .subscribe(
          res => {
              resolve(res);
          },
          err => {
            console.log("error");
            reject(err);
          }
        );
    });
  }

  room(id) : Promise<any>{    
    return new Promise((resolve, reject) => {
      this.http.get(this.ipAPI + "/room/getRoomDetailsWithDatas/" + id)
      .subscribe(function (response:any) {                     
        resolve(response)
      });
  }); 
  }

  getRoomDatasByPeriode(id, startDate, endDate) : Promise<any>{    
    return new Promise((resolve, reject) => {
      this.http.get(this.ipAPI + "/room/getRoomDatasByPeriode/" + id + "/" + startDate + "/" + endDate + "/10")
      .subscribe(function (response:any) {                     
        resolve(response)
      });
  }); 
  }

  registerDeviceToRoom(id, uuid){
    return new Promise((resolve, reject) => {
      this.http.put(this.ipAPI + "/room/registerToRoom/" + id +  "/" + uuid, {
      }).subscribe(function (response:any) {                     
        resolve(response)
      });
    });
  }

  unregisterDeviceToRoom(id, uuid){
    return new Promise((resolve, reject) => {
      this.http.put(this.ipAPI + "/room/unregisterToRoom/" + id +  "/" + uuid, {
      }).subscribe(function (response:any) {                     
        resolve(response)
      });
    });
  }


}
