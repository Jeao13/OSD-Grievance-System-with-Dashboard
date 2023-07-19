import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-report-modal',
  styleUrls: ['./report-modal.component.scss'],
  template: `
    <ion-header>
     <ion-toolbar class="header-toolbar">
        <ion-title>{{ violation }}</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismissModal()">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="custom-image">
    <div class="modal-container">
      <ion-card>
        <ion-card-content class="card-content">
          <pre>{{ report }}</pre>
        </ion-card-content>
      </ion-card>
      </div>
    </ion-content>
  `
})
export class ReportModalComponent {
  @Input() violation: string;
  @Input() report: string;

  constructor(private modalController: ModalController) {}

  dismissModal() {
    this.modalController.dismiss();
  }
}