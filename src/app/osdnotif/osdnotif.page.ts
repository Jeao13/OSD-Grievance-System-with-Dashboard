import { Component } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-osdnotif',
  templateUrl: './osdnotif.page.html',
  styleUrls: ['./osdnotif.page.scss'],
})
export class OsdnotifPage {
  username: string | null;
  department: string | null; // Updated type to allow null values
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
    this.loadAndDisplayViolationReport()

  }


  loadAndDisplayViolationReport() {
    this.http.get('assets/notifications-admin.xml', { responseType: 'text' }).subscribe(
      (data) => {
        this.xmlData = data;
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'text/xml');
        const datas = xmlDoc.getElementsByTagName('notif');
  
        this.matchingData = [];
        for (let i = 0; i < datas.length; i++) {
          const deptElement = datas[i].getElementsByTagName('dept')[0];
          const dept = deptElement ? deptElement.textContent : '';
          const message = datas[i].getElementsByTagName('message')[0].textContent;
          const time = datas[i].getElementsByTagName('time')[0].textContent;
  
          this.matchingData.push({ dept, message, time });
          
        }
     
  
        this.showResults = true;
      },
      (error) => {
        console.error('Error loading XML file:', error);
      }
    );
  }
  clearDataInXMLFile() {
    const url = 'http://localhost/clear-notif.php'; // Replace with the correct URL of your PHP file

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    // Make a POST request to the PHP file
    this.http.post(url, {}, { headers }).subscribe(
      (response) => {
        console.log('Contents cleared successfully:', response);
        // Handle the success response here, if needed
      },
      (error) => {
        console.error('Error clearing contents:', error);
        // Handle the error response here, if needed
      }
    );
  }

}