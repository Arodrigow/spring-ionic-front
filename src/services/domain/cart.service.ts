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

  removeProduct(product: ProductDTO) {
    let cart: Cart = this.getCart();
    let pos = cart.cartItems.findIndex(x => x.product.id == product.id);
    if (pos != -1) {
      cart.cartItems.splice(pos, 1)
    }
    this.storage.setCart(cart);
    return cart;
  }

  addToQuantity(product: ProductDTO) {
    let cart: Cart = this.getCart();
    let pos = cart.cartItems.findIndex(x => x.product.id == product.id);
    if (pos != -1) {
      cart.cartItems[pos].quantity++;
    }
    this.storage.setCart(cart);
    return cart;
  }

  subToQuantity(product: ProductDTO) {
    let cart: Cart = this.getCart();
    let pos = cart.cartItems.findIndex(x => x.product.id == product.id);
    if (pos != -1) {
      cart.cartItems[pos].quantity--;
      if (cart.cartItems[pos].quantity < 1) {
        cart = this.removeProduct(product);
      }
    }
    this.storage.setCart(cart);
    return cart;
  }

  total() {
    let cart = this.getCart();
    let sum = 0;
    for (let cartItem of cart.cartItems) {
      sum += cartItem.product.price * cartItem.quantity
    }
    return sum;
  }
}
