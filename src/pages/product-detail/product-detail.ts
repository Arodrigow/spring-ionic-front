import { CartService } from './../../services/domain/cart.service';
import { API_CONFIG } from './../../config/api.config';
import { ProductService } from './../../services/domain/product.service';
import { ProductDTO } from './../../models/product.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {

  item: ProductDTO;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public productService: ProductService,
    public cartService: CartService) {
  }

  ionViewDidLoad() {
    const product_id = this.navParams.get('product_id');
    this.productService.findById(product_id).subscribe(
      response => {
        this.item = response;
        this.getImageUrlIfExist();
      },
      error => {}
    );
  }

  addToCart(product: ProductDTO) {
    this.cartService.addProduct(product);
    this.navCtrl.setRoot('CartPage');
  }

  getImageUrlIfExist() {
    this.productService.getImageFromBucket(this.item.id).subscribe(
      response => {
        this.item.imgUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.item.id}.jpg`
      },
      error => {}
    );
  }
}
