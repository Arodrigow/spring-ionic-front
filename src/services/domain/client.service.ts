import { ImageUtilService } from './../image-util.service';
import { API_CONFIG } from './../../config/api.config';
import { ClientDTO } from './../../models/client.dto';
import { StorageService } from './../storage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";


@Injectable()
export class ClientService {

  constructor(public http: HttpClient,
    public storage: StorageService,
    public imageUtil: ImageUtilService) {}

  insert(obj: ClientDTO) {
    return this.http.post(`${API_CONFIG.baseUrl}/clients`, obj, {
      observe: 'response',
      responseType: 'text'
    });
  }

  findById(id: string) {
    return this.http.get(`${API_CONFIG.baseUrl}/clients/${id}`)
  }

  findByEmail(email: string) {
    return this.http.get(`${API_CONFIG.baseUrl}/clients/email?value=${email}`)
  }

  getImageFromBucket(id: string) {
    let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`;
    return this.http.get(url, { responseType: 'blob' })
  }

  uploadPicture(picture) {
    const pictureBlob = this.imageUtil.dataUriToBlob(picture);
    const formData: FormData = new FormData();
    formData.set('file', pictureBlob, 'file.png');


    return this.http.post(`${API_CONFIG.baseUrl}/clients/picture`, formData, {
      observe: 'response',
      responseType: 'text'
    });
  }
}
