import { StorageService } from './../services/storage.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { AlertController } from 'ionic-angular';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(public storage: StorageService, public alertControl: AlertController) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .catch((error, caught) => {
        let errorObj = error;

        if (errorObj.error) {
          errorObj = errorObj.error;
        }
        if (!errorObj.status) {
          errorObj = JSON.parse(errorObj);
        }
        console.log("Error detected by inteceptor.")
        console.log(errorObj)

        switch (errorObj.status) {
          case 401:
            this.handle401();
            break;
          case 403:
            this.handle403();
            break;
          default:
            this.handleDefaultError(errorObj);
        }

        return Observable.throw(errorObj);
      }) as any;
  }

  handle403() {
    this.storage.setLocalUser(null);
  }

  handle401() {
    const alert = this.alertControl.create({
      title: 'Error 401: authentication failed',
      message: 'Email or password is incorrect',
      enableBackdropDismiss: false,
      buttons: [{
        text: 'ok',
      }]
    });
    alert.present();
  }

  handleDefaultError(errorObj) {
    const alert = this.alertControl.create({
      title: `Error ${errorObj.status}: ${errorObj.error}`,
      message: errorObj.message,
      enableBackdropDismiss: false,
      buttons: [{
        text: 'ok',
      }]
    });
    alert.present();
  }

}

export const ErrorInteceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
}
