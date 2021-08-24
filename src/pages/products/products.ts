import { ProductDTO } from './../../models/product.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {
  items: ProductDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.items = [
      {
        id: "1",
        name: "Teste 1",
        price: 1.99
      },
      {
        id: "2",
        name: "Teste 2",
        price: 2.99
      },
      {
        id: "3",
        name: "Teste 3",
        price: 3.99
      },
    ];
  }

}
