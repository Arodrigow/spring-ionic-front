import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      name: ['Oy', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
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
    console.log('ionViewDidLoad SignupPage');
  }

  signupUser() {
    console.log("form");
  }


}
