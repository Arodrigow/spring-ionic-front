import { ClientService } from './../../services/domain/client.service';
import { CityDTO } from './../../models/city.dto';
import { StateDTO } from './../../models/state.dto';
import { StateService } from './../../services/domain/state.service';
import { CityService } from './../../services/domain/city.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup
  states: StateDTO[];
  cities: CityDTO[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cityService: CityService,
    public stateService: StateService,
    public clientService: ClientService,
    public alertController: AlertController) {

    this.formGroup = this.formBuilder.group({
      name: ['Oyson', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['oy@gmail.com', [Validators.required, Validators.email]],
      type: ['1', [Validators.required]],
      cpfOrCnpj: ['99406311038', [Validators.required, Validators.minLength(11), Validators.maxLength(15)]],
      password: ['123', [Validators.required]],
      publicPlace: ['Rua João Gentilini Fasciani', [Validators.required]],
      number: ['219', [Validators.required]],
      complement: ['Perto da esquina', []],
      district: ['Fátima', []],
      cep: ['39800000', [Validators.required]],
      phone1: ['33988881111', [Validators.required]],
      phone2: ['', []],
      phone3: ['', []],
      stateId: [null, [Validators.required]],
      cityId: [null, [Validators.required]]
    });
  }

  ionViewDidLoad() {
    this.stateService.findAll().subscribe(
      response => {
        this.states = response;
        this.formGroup.controls.stateId.setValue(this.states[0]);
        this.updateCities();
      },
      error => {});
  }

  updateCities() {
    const stateId = this.formGroup.value.stateId;
    this.cityService.findAll(stateId).subscribe(
      response => {
        this.cities = response
        this.formGroup.controls.cityId.setValue(null);
      },
      error => {}
    );
  }

  signupUser() {
    this.clientService.insert(this.formGroup.value).subscribe(
      response => {
        this.showInsertOk();
      },
      error => {}
    );
  }

  showInsertOk() {
    const alert = this.alertController.create({
      title: "Success!",
      message: "Sign up successful.",
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'ok',
          handler: () => {
            this.navCtrl.pop()
          }
        }
      ]
    });
    alert.present();
  }

}
