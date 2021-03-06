import { ProductDTO } from './../../models/product.dto';
import { Observable } from 'rxjs/Rx';
import { API_CONFIG } from './../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable()
export class ProductService {
  constructor(public http: HttpClient) {}

  findById(product_id: string) {
    return this.http.get<ProductDTO>(`${API_CONFIG.baseUrl}/products/${product_id}`);
  }

  findByCategory(category_id: string, page: number = 0, linesPerPage: number = 24) {
    return this.http.get(`${API_CONFIG.baseUrl}/products?categories=${category_id}&page=${page}&linesPerPage=${linesPerPage}`);
  }

  getImageFromBucket(id: string): Observable<any> {
    const url = `${API_CONFIG.bucketBaseUrl}/prod${id}.jpg`;
    return this.http.get(url, { responseType: 'blob' });
  }
  getSmallImageFromBucket(id: string): Observable<any> {
    const url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`;
    return this.http.get(url, { responseType: 'blob' });
  }
}
