import { OrderDTO } from './../../models/order.dto';
import { API_CONFIG } from './../../config/api.config';
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable()
export class OrderService {

  constructor(public http: HttpClient) {}

  insert(order: OrderDTO) {
    return this.http.post(`${API_CONFIG.baseUrl}/orders`, order,
      {
        observe: 'response',
        responseType: 'text'
      });
  }
}
