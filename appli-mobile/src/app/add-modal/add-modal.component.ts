import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavParams } from '@ionic/angular';
import { GetApiService } from 'src/services/get-api.service';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss'],
})
export class AddModalComponent implements OnInit {

  @Input()
  addForm: FormGroup;


  constructor(public navParams : NavParams, private formBuilder: FormBuilder, private Api : GetApiService) { }

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
    const formValue = this.addForm.value;
    await this.Api.addPortillon(formValue).then((response: any) => {
      console.log(response)
      this.navParams.data.homeref.getPortillons()
      this.navParams.data.homeref.dismissModal()
    })
  }
}
