import { ProductService } from './../../services/domain/product.service';
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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public productService: ProductService) {
  }

  ionViewDidLoad() {
    const category_id = this.navParams.get('category_id');
    this.productService.findByCategory(category_id).subscribe(
      response => {
        this.items = response['content'];
      },
      error => {}
    );
  }

}
