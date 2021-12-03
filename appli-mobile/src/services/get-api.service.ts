import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GetApiService {

  ipAPI = environment.API_URL;

  constructor(private http: HttpClient) { }

  async portillons() {
    return new Promise((resolve, reject) => {
      this.http
        .get<any>(this.ipAPI + "/portillon/getPortillons", {
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

  portillon(id) : Promise<any>{    
    return new Promise((resolve, reject) => {
      this.http.get(this.ipAPI + "/portillon/getPortillon/" + id)
      .subscribe(function (response:any) {                     
        resolve(response)
      });
  }); 
  }

  addPortillon(data) : Promise<any>{    
    console.log(data)
    return new Promise((resolve, reject) => {
      this.http
        .post<any>(
          this.ipAPI + '/portillon/addPortillon',
          data,
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .subscribe(
          res => {
            if (res.success === true) {
              resolve(res);
            } else {
              reject(res);
            }
          },
          err => {
            reject(err);
          }
        );
    });

  }

  deletePortillon(id) : Promise<any>{    
    return new Promise((resolve, reject) => {
      this.http.delete(this.ipAPI + "/portillon/deletePortillon/" + id)
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
