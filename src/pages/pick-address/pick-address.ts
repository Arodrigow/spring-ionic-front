import { AddressDTO } from './../../models/address.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  addresses: AddressDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.addresses = [
      {
        id: "1",
        publicPlace: "Rua quinze de novembro",
        number: "300",
        complement: 'Apto 200',
        district: 'Santa Monica',
        cep: '48293822',
        city: {
          id: '1',
          name: 'Uberlandia',
          state: {
            id: '1',
            name: "Minas Gerais"
          }
        }
      },
      {
        id: "2",
        publicPlace: "Rua alexandre de novembro",
        number: "64",
        complement: 'Apto 001',
        district: 'Santa Luzia',
        cep: '48293811',
        city: {
          id: '3',
          name: 'São Paulo',
          state: {
            id: '2',
            name: "São Paulo"
          }
        }
      },

    ]
  }

}
