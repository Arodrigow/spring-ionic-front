import { Observable } from 'rxjs/Rx';
import { API_CONFIG } from './../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable()
export class ProductService {
  constructor(public http: HttpClient) {}

  findByCategory(category_id: string) {
    return this.http.get(`${API_CONFIG.baseUrl}/products?categories=${category_id}`);
  }

  getSmallImageFromBucket(id: string): Observable<any> {
    const url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`;
    return this.http.get(url, { responseType: 'blob' });
  }
}
