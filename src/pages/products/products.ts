import { API_CONFIG } from './../../config/api.config';
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
        this.loadImageUrl();
      },
      error => {}
    );
  }

  loadImageUrl() {
    for (let product of this.items) {
      this.productService.getSmallImageFromBucket(product.id).subscribe(
        response => {
          product.imgUrl = `${API_CONFIG.bucketBaseUrl}/prod${product.id}-small.jpg`
        },
        error => {}
      );

    }
  }

  showDetail() {
    this.navCtrl.push('ProductDetailPage')
  }

}
