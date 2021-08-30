import { Camera, CameraOptions } from '@ionic-native/camera';
import { API_CONFIG } from './../../config/api.config';
import { ClientDTO } from './../../models/client.dto';
import { ClientService } from './../../services/domain/client.service';
import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  client: ClientDTO
  picture: string;
  cameraOn: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public clientService: ClientService,
    public camera: Camera) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  getImageIfExists() {
    this.clientService.getImageFromBucket(this.client.id).subscribe(
      response => {
        this.client.profilePicUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.client.id}.jpg`
      },
      error => {}
    );
  }

  getCameraPicture() {
    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then(
      imageData => {
        this.picture = 'data:image/png;base64,' + imageData;
        this.cameraOn = false;
      },
      error => {});
  }

  sendPicture() {
    this.clientService.uploadPicture(this.picture).subscribe(
      response => {
        this.picture = null;
        this.loadData();
      },
      error => {}
    );
  }

  cancel() {
    this.picture = null;
  }

  loadData() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clientService.findByEmail(localUser.email).subscribe(
        response => {
          this.client = response as ClientDTO;
          this.getImageIfExists();
        },
        error => {
          if (error.status == 403) {
            this.navCtrl.setRoot('HomePage');
          }
        }
      );
    } else {
      this.navCtrl.setRoot('HomePage');
    }
  }
}
