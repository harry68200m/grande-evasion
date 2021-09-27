import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class GetApiService {

  ipAPI = 'http://localhost:3000'


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
}
