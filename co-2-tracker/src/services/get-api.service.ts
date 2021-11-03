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

  async room(id) {
    return new Promise((resolve, reject) => {
      this.http
        .get<any>(this.ipAPI + "/room/getRoomDetailsWithDatas/" + id, {
          headers: {
            "Content-Type": "application/json"
          },
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

}
