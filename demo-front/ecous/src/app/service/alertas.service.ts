import { Injectable } from '@angular/core';
import{BsModalRef, BsModalService} from 'ngx-bootstrap/modal'
import { AlertasComponent } from '../alertas/alertas.component';
@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  constructor(
    private bsModalService: BsModalService
  ) { }

private showalert(message:string,type:string){
  const bsModalRef: BsModalRef = this.bsModalService.show(AlertasComponent)
  bsModalRef.content.type = type
  bsModalRef.content.message = message

}

showAlertDanger(message:string) {
this.showalert(message,'danger')
}

showAlertSuccess(message:string) {
  this.showalert(message,'success') 
  }
  
  


}