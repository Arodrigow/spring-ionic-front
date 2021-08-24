import { API_CONFIG } from './../../config/api.config';
import { ClientDTO } from './../../models/client.dto';
import { Observable } from 'rxjs/Rx';
import { StorageService } from './../storage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";


@Injectable()
export class ClientService {

  constructor(public http: HttpClient, public storage: StorageService) {}

  insert(obj: ClientDTO) {
    return this.http.post(`${API_CONFIG.baseUrl}/clients`, obj, {
      observe: 'response',
      responseType: 'text'
    });
  }

  findByEmail(email: string): Observable<ClientDTO> {
    return this.http.get<ClientDTO>(`${API_CONFIG.baseUrl}/clients/email?value=${email}`)
  }

  getImageFromBucket(id: string) {
    let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`;
    return this.http.get(url, { responseType: 'blob' })
  }
}
