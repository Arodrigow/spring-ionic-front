import { API_CONFIG } from './../../config/api.config';
import { CategoryDTO } from './../../models/category.dto';
import { CategoryService } from './../../services/domain/category.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  items: CategoryDTO[];
  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public categoryService: CategoryService) {
  }

  ionViewDidLoad() {
    this.categoryService.findAll()
      .subscribe(response => {
        this.items = response;
      },
        error => {});
  }

  showProducts() {
    this.navCtrl.push('ProductsPage');
  }
}
