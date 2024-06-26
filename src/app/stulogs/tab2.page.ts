import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { ModalController } from '@ionic/angular';
import { ReportModalComponent } from './report-modal.component';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page {
  username: string | null; // Updated type to allow null values
  xmlData: any;
  matchingData: any[] = [];
  showResults = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private dataService: DataService,
    private modalController: ModalController
  ) {}

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

    this.http.get('assets/data.xml', { responseType: 'text' }).subscribe(
      (data) => {
        this.xmlData = data;
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'text/xml');
        const datas = xmlDoc.getElementsByTagName('data');

        this.matchingData = [];
        for (let i = 0; i < datas.length; i++) {
          const srcodeElement = datas[i].getElementsByTagName('srcode')[0];
          const srcode = srcodeElement ? srcodeElement.textContent : '';
          if (srcode === this.username) {
            const dept = datas[i].getElementsByTagName('dept')[0].textContent;
            const violation = datas[i].getElementsByTagName('violation')[0].textContent;
            const report = datas[i].getElementsByTagName('report')[0].textContent;
            const timestamp = datas[i].getElementsByTagName('timestamp')[0].textContent;
            const status = datas[i].getElementsByTagName('status')[0].textContent;

            this.matchingData.push({ dept, violation, report,timestamp,status });
          }
        }

        this.showResults = true;
      },
      (error) => {
        console.error('Error loading XML file:', error);
      }
    );
  }
  async openReportModal(report: string, violation:string) {
    const modal = await this.modalController.create({
      component: ReportModalComponent,
      componentProps: {
        report: report,
        violation: violation
      }
    });

    return await modal.present();
  }
}