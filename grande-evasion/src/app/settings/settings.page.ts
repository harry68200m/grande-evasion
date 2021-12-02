import { Component } from '@angular/core';
import json from '../../../package.json'

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {

  public AppVersion

  constructor() {
    this.AppVersion = json.version
  }


}
