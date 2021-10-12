import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css']
})
export class AlertasComponent implements OnInit {

  @Input() message: string;

  constructor(
    public modal: BsModalRef

  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.modal.hide();
      console.log("Aplicou o hide!");

    }, 1000);
  }

  onClose() {
    this.modal.hide();

  }

}
