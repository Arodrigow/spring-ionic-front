import { ProductDTO } from './../../models/product.dto';
import { StorageService } from './../storage.service';
import { Injectable } from "@angular/core";
import { Cart } from '../../models/cart';


@Injectable()
export class CartService {
  constructor(public storage: StorageService) {}

  createOrClearCart(): Cart {
    const cart: Cart = { cartItems: [] };
    this.storage.setCart(cart);
    return cart;
  }

  getCart(): Cart {
    let cart: Cart = this.storage.getCart();
    if (cart == null) {
      cart = this.createOrClearCart()
    }
    return cart;
  }

  addProduct(product: ProductDTO) {
    let cart: Cart = this.getCart();
    let pos = cart.cartItems.findIndex(x => x.product.id == product.id);
    if (pos == -1) {
      cart.cartItems.push({ quantity: 1, product })
    }
    this.storage.setCart(cart);
    return cart;
  }
}
