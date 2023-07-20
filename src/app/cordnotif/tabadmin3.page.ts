import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-tabadmin3',
  templateUrl: './tabadmin3.page.html',
  styleUrls: ['./tabadmin3.page.scss'],
})
export class Tabadmin3Page {
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

    this.dataService.dept$.subscribe((dept) => {
      if (dept) {
        // Do whatever you want with the dept value here
        
        this.department=dept;
        this.loadAndDisplayViolationReport()
        console.log(this.department);
      }
    });
  }


  loadAndDisplayViolationReport() {
    if (!this.department) {
      return; // Handle the case where username is null
    }

    this.http.get('assets/notifications-admin.xml', { responseType: 'text' }).subscribe(
      (data) => {
        this.xmlData = data;
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'text/xml');
        const datas = xmlDoc.getElementsByTagName('notif');
       

        this.matchingData = [];
        for (let i = 0; i < datas.length; i++) {
          const srcodeElement = datas[i].getElementsByTagName('dept')[0];
          const srcode = srcodeElement ? srcodeElement.textContent : '';
          if (srcode === this.department) {
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

  clearDataInXMLFile() {
    const url = 'http://localhost/clear-stunotif.php'; // Replace with the correct URL of your PHP file\
    const data = {
      srcode: this.username
 
        

    };

    // Make a POST request to the PHP file
    this.http.post(url, data).subscribe(
      (response) => {
        console.log('Contents cleared successfully:', response);
        this.loadAndDisplayViolationReport();
      },
      (error) => {
        console.error('Error clearing contents:', error);
        // Handle the error response here, if needed
      }
    );
  }

}