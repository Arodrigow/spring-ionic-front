import { CartService } from './../../services/domain/cart.service';
import { OrderDTO } from './../../models/order.dto';
import { StorageService } from './../../services/storage.service';
import { ClientService } from './../../services/domain/client.service';
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
  order: OrderDTO;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public clientService: ClientService,
    public cartService: CartService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clientService.findByEmail(localUser.email).subscribe(
        response => {
          this.addresses = response['addresses']
          let cart = this.cartService.getCart();

          this.order = {
            client: { id: response['id'] },
            deliveryAddress: null,
            payment: null,
            items: cart.cartItems.map(x => {
              return {
                quantity: x.quantity,
                product: { id: x.product.id }
              }
            })
          }
        },
        error => {
          if (error.status == 403) {
            this.navCtrl.setRoot('HomePage');
          }
        }
      );
    } else {
      this.navCtrl.setRoot('HomePage');
    }
  }

  nextPage(address: AddressDTO) {
    this.order.deliveryAddress = { id: address.id };
    this.navCtrl.push('PaymentPage', { order: this.order });
  }
}
