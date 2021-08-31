import { Camera, CameraOptions } from '@ionic-native/camera';
import { API_CONFIG } from './../../config/api.config';
import { ClientDTO } from './../../models/client.dto';
import { ClientService } from './../../services/domain/client.service';
import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  client: ClientDTO
  picture: string;
  cameraOn: boolean = false;
  profileImage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public clientService: ClientService,
    public camera: Camera,
    public sanitizer: DomSanitizer) {

    this.profileImage = 'assets/imgs/avatar-blank.png'
  }

  ionViewDidLoad() {
    this.loadData();
  }

  getImageIfExists() {
    this.clientService.getImageFromBucket(this.client.id).subscribe(
      response => {
        this.client.profilePicUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.client.id}.jpg`;
        this.blobToDataUrl(response).then(dataUrl => {
          let str = dataUrl as string;
          this.profileImage = this.sanitizer.bypassSecurityTrustUrl(str);
        },
          error => {
            this.profileImage = 'assets/imgs/avatar-blank.png'
          });
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
      error => {
        this.cameraOn = false;
      });
  }

  getGalleryPicture() {
    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then(
      imageData => {
        this.picture = 'data:image/png;base64,' + imageData;
        this.cameraOn = false;
      },
      error => {
        this.cameraOn = false;
      });
  }

  sendPicture() {
    this.clientService.uploadPicture(this.picture).subscribe(
      response => {
        this.picture = null;
        this.getImageIfExists();
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

  blobToDataUrl(blob) {
    return new Promise((fulfill, reject) => {
      let reader = new FileReader();
      reader.onerror = reject;
      reader.onload = (e) => fulfill(reader.result);
      reader.readAsDataURL(blob);
    });
  }
}
