import { API_CONFIG } from './../../config/api.config';
import { CategoryDTO } from './../../models/category.dto';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { Injectable } from '@angular/core';

@Injectable()
export class CategoryService {

  constructor(public http: HttpClient) { }

  findAll(): Observable<CategoryDTO[]> {
    return this.http.get<CategoryDTO[]>(`${API_CONFIG.baseUrl}/categories`);
  }
}
