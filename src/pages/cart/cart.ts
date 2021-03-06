import { ProductDTO } from './../../models/product.dto';
import { CartService } from './../../services/domain/cart.service';
import { API_CONFIG } from './../../config/api.config';
import { ProductService } from './../../services/domain/product.service';
import { CartItem } from './../../models/cartItem';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  items: CartItem[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cartService: CartService,
    public productService: ProductService) {
  }

  ionViewDidLoad() {
    let cart = this.cartService.getCart();
    this.items = cart.cartItems;
    this.loadImageUrl();
  }

  loadImageUrl() {
    for (let item of this.items) {
      this.productService.getSmallImageFromBucket(item.product.id).subscribe(
        response => {
          item.product.imgUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.product.id}-small.jpg`
        },
        error => {}
      );

    }
  }

  removeItem(product: ProductDTO) {
    this.items = this.cartService.removeProduct(product).cartItems;
  }

  addToQuantity(product: ProductDTO) {
    this.items = this.cartService.addToQuantity(product).cartItems;
  }

  subToQuantity(product: ProductDTO) {
    this.items = this.cartService.subToQuantity(product).cartItems;
  }

  total(): number {
    return this.cartService.total();
  }

  keepShopping() {
    this.navCtrl.setRoot('CategoriesPage')
  }

  checkout() {
    this.navCtrl.push('PickAddressPage')
  }
}
