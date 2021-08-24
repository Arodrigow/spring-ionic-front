import { FieldMessage } from './../models/fieldmessage';
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
          case 422:
            this.handle422(errorObj);
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

  handle422(errorObj) {
    const alert = this.alertControl.create({
      title: 'Error 422: Validation',
      message: this.listErrors(errorObj.errors),
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

  listErrors(messages: FieldMessage[]) {
    let s: string = '';
    for (let x in messages) {
      s = `${s} <p><strong>${messages[x].fieldName}</strong>: ${messages[x].msg} </p>`
    }
    return s;
  }

}

export const ErrorInteceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
}
