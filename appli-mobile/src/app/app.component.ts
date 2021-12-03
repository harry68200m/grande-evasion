import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Device } from '@ionic-native/device/ngx';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private socket: Socket,
    private backgroundMode: BackgroundMode,
    private localNotification : LocalNotifications,
    private device : Device
    ) {
  }
  
   async ngOnInit() {
    this.backgroundMode.enable();
    this.socket.connect();
    setTimeout(() => {
      this.socket.emit('subscribeDevice', this.device.uuid);

      this.socket.fromEvent('notif').subscribe(message => {
        console.log(message)
        this.sendNotif(message)
      });  
    }, 800);
    
  }

  sendNotif (message) {
    this.localNotification.schedule({
    title:  message.titre + ' ' + message.portillon,
    text: message.texte,
    foreground: true})
  }


}
