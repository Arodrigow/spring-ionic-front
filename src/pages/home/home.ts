import { AuthService } from '../../services/auth.service';
import { CredentialsDTO } from './../../models/credential.dto';
import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  cred: CredentialsDTO = {
    email: "",
    password: ""
  }

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public authService: AuthService) {

  }

  login() {

    this.authService.authenticate(this.cred).subscribe(
      response => {
        this.authService.successfullLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot("CategoriesPage");
      },
      error => { }
    );
  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }
}
