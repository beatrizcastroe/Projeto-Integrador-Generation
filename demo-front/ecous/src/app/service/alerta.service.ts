import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertasComponent } from '../alertas/alertas.component';


@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  constructor(
    private bsModalService: BsModalService

  ) { }

  private showAlert(message: string) {
    const bsModalRef: BsModalRef = this.bsModalService.show(AlertasComponent);

    bsModalRef.content.message = message;

  }

  alertaMensagem(message: string) {
    this.showAlert(message);

  }

}