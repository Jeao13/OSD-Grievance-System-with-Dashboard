import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modal-status',
  styleUrls: ['./modal-status.component.scss'],
  template: `
    <ion-header>
      <ion-toolbar class="header-toolbar">
        <ion-title>{{ violation }}</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismissModal()">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class ="custom-image">
      <ion-card>
        <ion-card-content class="card-content">
          <pre>{{ report }}</pre>
        </ion-card-content>
      </ion-card>
      <ion-item>
          <ion-label position="floating">Change Status</ion-label>
          <ion-select [(ngModel)]="message" name="message1" (ionChange)="saveData(report)">
            <ion-select-option value="Taken Action">Taken Action</ion-select-option>
            <ion-select-option value="Case Closed">Case Closed</ion-select-option>
          </ion-select>
      </ion-item>
  
    </ion-content>
  `
})
export class ReportModalComponent1 {
  @Input() violation: string;
  @Input() report: string;
  message: string;

  constructor(private modalController: ModalController,   private http: HttpClient,) {}

  dismissModal() {
    this.modalController.dismiss();
  }

  saveData(x:string) {
   
    const apiUrl = 'http://localhost/modify-status.php'; // Replace with the actual URL of your PHP script
    const data = {
      status: this.message,
    
      violation:x,
      timestamp: new Date().toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }    )

    };

    this.http.post(apiUrl, data).subscribe(
      () => {
        console.log('Data saved successfully');
      },
      (error) => {
        console.error('Error saving data:', error);
      }
    );
  }
}
