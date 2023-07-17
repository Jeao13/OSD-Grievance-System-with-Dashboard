import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { saveAs } from 'file-saver';
import { ModalController } from '@ionic/angular';
import { ReportModalComponent } from './report-modal.component';


@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  username: string;
  user: User = {};
   user1: User1 = {}; // Initialize with an empty object
  safeProfilePicUrl: SafeResourceUrl;
  showFormsDropdown = false;
  isClassDisabled = true;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,

    private router: Router,
    private dataService: DataService,
    private modalController: ModalController

  ) {}

  downloadFile() {
    const fileUrl = 'assets/BatStateU-FO-OSD-07_Formal Complaint Letter_Rev. 02.pdf'; // Replace with the path to your file
  
    this.http.get(fileUrl, { responseType: 'blob' }).subscribe(
      (response) => {
        saveAs(response, 'BatStateU-FO-OSD-07_Formal Complaint Letter_Rev. 02.pdf'); // Save the file locally with the desired name
      },
      (error) => {
        console.error('Error fetching file: ' + error);
        // Handle error, e.g., display an error message
      }
    );
  }

  downloadFile1() {
    const fileUrl = 'assets/BatStateU-FO-OSD-10_Request for New ID_Rev. 03.pdf'; // Replace with the path to your file
  
    this.http.get(fileUrl, { responseType: 'blob' }).subscribe(
      (response) => {
        saveAs(response, 'BatStateU-FO-OSD-10_Request for New ID_Rev. 03.pdf'); // Save the file locally with the desired name
      },
      (error) => {
        console.error('Error fetching file: ' + error);
        // Handle error, e.g., display an error message
      }
    );
  }

  
  toggleClass(event: Event) {
    event.stopPropagation(); // Prevent the event from propagating

    this.isClassDisabled = !this.isClassDisabled;
  }
 
    
  

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.username = params['username'];
      this.dataService.setUsername(this.username);

      const { name, college, year, profilePic } = params;
      this.user = { name, college, year, profilePic };

      if (this.username) {
        this.displayUserInfo();
        this.displayUserInfo1()
      }
    });
  }

  file() {
    this.router.navigate(['/forgot-password'], { queryParams: { username: this.username } });
  }

  toggleFormsDropdown() {
    this.showFormsDropdown = !this.showFormsDropdown;
  }
 
  logout() {
    // Clear user data from local storage or session storage
    localStorage.removeItem('userToken');
  sessionStorage.clear();

  // Reset any user-related variables to their default values
  this.username = '';

  // Redirect the user to the login page and replace the current history entry
  this.router.navigate(['/home'], { replaceUrl: true });
  }

  displayUserInfo() {
   
    this.http.get('assets/users.xml', { responseType: 'text' }).subscribe((xmlData) => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlData, 'application/xml');

      const users = xmlDoc.getElementsByTagName('user');

      for (let i = 0; i < users.length; i++) {
        const currentUser = users[i];
        const currentUsername = currentUser.getElementsByTagName('username')[0]?.textContent;

        if (currentUsername === this.username) {
          const nameNode = currentUser.getElementsByTagName('name')[0]?.textContent;
          const collegeNode = currentUser.getElementsByTagName('college')[0]?.textContent;
          const yearNode = currentUser.getElementsByTagName('year')[0]?.textContent;
          const profilePicNode = currentUser.getElementsByTagName('profilePic')[0]?.textContent;

          const name = nameNode || '';
          const college = collegeNode || '';
          const year = yearNode || '';
          const profilePic = profilePicNode || '';

          this.user = {
            name,
            college,
            year,
            profilePic,
          };
          break;
        }
      }
    });
  }
  

  displayUserInfo1() {
   
    this.http.get('assets/sanctions.xml', { responseType: 'text' }).subscribe((xmlData) => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlData, 'application/xml');

      const users = xmlDoc.getElementsByTagName('Forms');

      for (let i = 0; i < users.length; i++) {
        const currentUser = users[i];
        const currentUsername = currentUser.getElementsByTagName('srcode')[0]?.textContent;

        if (currentUsername === this.username) {
          const nameNode = currentUser.getElementsByTagName('violation')[0]?.textContent;
          const collegeNode = currentUser.getElementsByTagName('time')[0]?.textContent;
        
     
         
          const violation = nameNode || '';
          const time = collegeNode || '';
         
          this.user1 = {
      
            violation,
            time,
        
          };
          break;
        }
      }
    });
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

interface User1 {

  violation?: string;
  time?: string;
  
}

interface User {
  name?: string;
  college?: string;
  year?: string;
  profilePic?: string;
}