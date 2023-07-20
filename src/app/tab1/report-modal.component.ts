import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-report-modal',
  styleUrls: ['./report-modal.component.scss'],
  template: `
  <ion-header>
  <ion-toolbar class="header-toolbar">
  <ion-buttons slot="end">
          <ion-button (click)="dismissModal()">Close</ion-button>
        </ion-buttons>
    <ion-title>
      Sanctions
    </ion-title>
  </ion-toolbar>
</ion-header>

<ion-content class="custom-image">
<div class="sanctions-container">
  <ion-list *ngIf="showResults">
    <ion-item  *ngFor="let data of matchingData">
      <ion-label>
      
        <h2>Type of Violation: {{ data.violation }}</h2>
        <p>{{ data.timestamp }}</p>
      
        
      </ion-label>
    </ion-item>
    <ion-item *ngIf="matchingData.length === 0">
      <ion-label>No results found for the entered username.</ion-label>
    </ion-item>
  </ion-list>
</div>
</ion-content>

  `
})
export class ReportModalComponent {
  @Input() violation: string;
  @Input() report: string;
   username: string | null; // Updated type to allow null values
  xmlData: any;
  matchingData: any[] = [];
  showResults = false;

  constructor(    private route: ActivatedRoute,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private dataService: DataService,
    private modalController: ModalController) {}

  dismissModal() {
    this.modalController.dismiss();
  }
  ngOnInit() {
    this.dataService.username$.subscribe((username) => {
      this.username = username;
     
      // Use the username as needed in the component logic
      if (this.username) {
        this. loadAndDisplayViolationReport();
      }
    });
  }
  
  loadAndDisplayViolationReport() {
    if (!this.username) {
      return; // Handle the case where username is null
    }
  
    this.http.get('assets/sanctions.xml', { responseType: 'text' }).subscribe(
      (data) => {
        this.xmlData = data;
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'text/xml');
        const forms = xmlDoc.querySelectorAll('forms'); // Use querySelectorAll
  
        this.matchingData = [];
        for (let i = 0; i < forms.length; i++) {
          const currentForm = forms[i];
          const srcodeElement = currentForm.querySelector('srcode');
          const srcode = srcodeElement ? srcodeElement.textContent : '';
  
          if (srcode === this.username) {
            const violationElement = currentForm.querySelector('violation');
            const violation = violationElement ? violationElement.textContent : '';
  
            const timestampElement = currentForm.querySelector('time');
            const timestamp = timestampElement ? timestampElement.textContent : '';
  
            this.matchingData.push({ violation, timestamp });
          }
        }
  
        this.showResults = true;
      },
      (error) => {
        console.error('Error loading XML file:', error);
      }
    );
  }
}