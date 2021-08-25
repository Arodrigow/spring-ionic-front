import { ProductService } from './../services/domain/product.service';
import { ClientService } from './../services/domain/client.service';
import { StorageService } from './../services/storage.service';
import { AuthService } from '../services/auth.service';
import { CategoryService } from './../services/domain/category.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthInteceptorProvider } from '../interceptors/auth.interceptor';
import { ErrorInteceptorProvider } from '../interceptors/error.interceptor';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    CategoryService,
    AuthInteceptorProvider,
    ErrorInteceptorProvider,
    AuthService,
    StorageService,
    ClientService,
    ProductService
  ]
})
export class AppModule {}
