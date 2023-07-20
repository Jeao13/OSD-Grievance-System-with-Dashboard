import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { ModalController } from '@ionic/angular';

import { ReportModalComponent1 } from './modal-status.component';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage {
  username: string | null; // Updated type to allow null values
  department:string;
  message: string;
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

    this.dataService.dept$.subscribe((dept) => {
      if (dept) {
        // Do whatever you want with the dept value here
        
        this.department=dept;
        console.log(this.department);
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
          const deptElement = datas[i].getElementsByTagName('dept')[0];
          const dept = deptElement ? deptElement.textContent : '';
          if (dept === this.department) {
            const srcodeElement = datas[i].getElementsByTagName('srcode')[0];
            const srcode = srcodeElement ? srcodeElement.textContent : '';
            const violation = datas[i].getElementsByTagName('violation')[0].textContent;
            const report = datas[i].getElementsByTagName('report')[0].textContent;
            const timestamp = datas[i].getElementsByTagName('timestamp')[0].textContent;
            const status = datas[i].getElementsByTagName('status')[0].textContent;

            this.matchingData.push({ srcode, dept,violation, report,timestamp,status });
          }
        }

        this.showResults = true;
      },
      (error) => {
        console.error('Error loading XML file:', error);
      }
    );
  }

  async openReportModal1(report: string, violation:string, srcode:string) {
    const modal = await this.modalController.create({
      component: ReportModalComponent1,
      componentProps: {
        report: report,
        violation: violation,
        srcode: srcode,
        functionInPage: this.loadAndDisplayViolationReport.bind(this)
      }
    });

    return await modal.present();
  }

}

