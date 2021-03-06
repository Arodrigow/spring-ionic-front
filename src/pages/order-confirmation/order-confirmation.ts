import { OrderService } from './../../services/domain/order.service';
import { AddressDTO } from './../../models/address.dto';
import { ClientDTO } from './../../models/client.dto';
import { ClientService } from './../../services/domain/client.service';
import { CartService } from './../../services/domain/cart.service';
import { CartItem } from './../../models/cartItem';
import { OrderDTO } from './../../models/order.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  order: OrderDTO;
  cartItems: CartItem[];
  client: ClientDTO;
  address: AddressDTO;
  orderCode: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public cartService: CartService,
    public clientService: ClientService,
    public orderService: OrderService) {
    this.order = this.navParams.get('order');
  }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().cartItems;

    this.clientService.findById(this.order.client.id).subscribe(
      response => {
        this.client = response as ClientDTO;
        this.address = this.findAddress(this.order.deliveryAddress.id, response['addresses']);
      },
      error => {
        this.navCtrl.setRoot('HomePage');
      }
    );
  }

  private findAddress(id: string, list: AddressDTO[]): AddressDTO {
    let pos = list.findIndex(x => x.id == id);
    return list[pos];
  }

  total() {
    return this.cartService.total();
  }

  back() {
    return this.navCtrl.setRoot('CartPage')
  }

  home() {
    return this.navCtrl.setRoot('CategoriesPage')
  }

  checkout() {
    this.orderService.insert(this.order).subscribe(
      response => {
        this.cartService.createOrClearCart();
        this.orderCode = this.extractId(response.headers.get('location'));
      },
      error => {
        if (error.status == 403) {
          this.navCtrl.setRoot('HomePage');
        }
      }
    );
  }

  private extractId(location: string): string {
    let pos = location.lastIndexOf('/');
    return location.substring(pos + 1, location.length);
  }
}
