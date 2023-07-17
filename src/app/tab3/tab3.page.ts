import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page {
  username: string | null; // Updated type to allow null values
  xmlData: any;
  matchingData: any[] = [];
  showResults = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private dataService: DataService,
   
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

    this.http.get('assets/notifications.xml', { responseType: 'text' }).subscribe(
      (data) => {
        this.xmlData = data;
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'text/xml');
        const datas = xmlDoc.getElementsByTagName('notif');

        this.matchingData = [];
        for (let i = 0; i < datas.length; i++) {
          const srcodeElement = datas[i].getElementsByTagName('srcode')[0];
          const srcode = srcodeElement ? srcodeElement.textContent : '';
          if (srcode === this.username) {
            const dept = datas[i].getElementsByTagName('message')[0].textContent;
            const violation = datas[i].getElementsByTagName('time')[0].textContent;


            this.matchingData.push({ dept, violation });
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