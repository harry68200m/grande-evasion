import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, NavController, NavParams } from '@ionic/angular';
import { GetApiService } from 'src/services/get-api.service';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss'],
})
export class AddModalComponent implements OnInit {

  @Input()
  addForm: FormGroup;


  constructor(public navParams : NavParams, 
              private formBuilder: FormBuilder, 
              private Api : GetApiService, 
              private navCtrl : NavController, 
              private alertController : AlertController) { }

   ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.addForm = this.formBuilder.group({
      nom: ['', [Validators.required]],  
      guid: ['', [Validators.required]],  
    });

  }


  async addPortillon() {
    const formValue = this.addForm.value
    console.log(formValue.guid.toString().length)
    if (formValue.guid.toString().length !== 4){
      this.presentAlertErrorNumberTooHigh()
    }
    else {
      await this.Api.addPortillon(formValue).then((response: any) => {
        this.navParams.data.homeref.getPortillons()
        this.navParams.data.homeref.dismissModal()
      })
    }
  }

  async presentAlertErrorNumberTooHigh() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Erreur lors de l\'ajout',
      subHeader: 'L\identifiant du capteur doit être compris être composé de 4 caractères entre 1111 et 9999',
      message: '',
      buttons: ['OK']
    });

    await alert.present();

  }
}
