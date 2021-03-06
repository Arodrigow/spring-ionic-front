import { CartService } from './domain/cart.service';
import { localUser } from './../models/local_user';
import { StorageService } from './storage.service';
import { API_CONFIG } from '../config/api.config';
import { HttpClient } from '@angular/common/http';
import { CredentialsDTO } from '../models/credential.dto';
import { Injectable } from "@angular/core";
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(
    public http: HttpClient,
    public storage: StorageService,
    public cartService: CartService) {}

  authenticate(cred: CredentialsDTO) {
    return this.http.post(`${API_CONFIG.baseUrl}/login`, cred,
      {
        observe: 'response',
        responseType: 'text'
      })
  }

  refreshToken() {
    return this.http.post(`${API_CONFIG.baseUrl}/auth/refresh_token`, {},
      {
        observe: 'response',
        responseType: 'text'
      })
  }

  successfullLogin(authorizationValue: string) {
    let tok = authorizationValue.substring(7);
    let user: localUser = {
      token: tok,
      email: this.jwtHelper.decodeToken(tok).sub
    }
    this.storage.setLocalUser(user);
    this.cartService.createOrClearCart();
  }

  logout() {
    this.storage.setLocalUser(null);
  }
}
