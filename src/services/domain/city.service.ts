import { API_CONFIG } from './../../config/api.config';
import { CityDTO } from './../../models/city.dto';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { Injectable } from '@angular/core';

@Injectable()
export class CityService {

  constructor(public http: HttpClient) {}

  findAll(stateId: string): Observable<CityDTO[]> {
    return this.http.get<CityDTO[]>(`${API_CONFIG.baseUrl}/states/${stateId}/cities`);
  }
}
