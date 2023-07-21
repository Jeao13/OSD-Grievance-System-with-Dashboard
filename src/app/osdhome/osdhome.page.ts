import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { saveAs } from 'file-saver';

interface Form {
  srcode: string | null;
  violation: string | null;
  dept: string | null;
}

@Component({
  selector: 'app-osdhome',
  templateUrl: './osdhome.page.html',
  styleUrls: ['./osdhome.page.scss'],
})
export class OsdhomePage implements OnInit {
  chartData: any[] = [
    { name: 'Label 1', value: 30 },
    { name: 'Label 2', value: 20 },
    { name: 'Label 3', value: 50 },
  ];

  username: string;
  dept: string;
  forms: Form[] = [];
  idRequirementCount = 0;
  user: User = {};
  cicsDeptCount = 0;
  user1: User1 = {}; // Initialize with an empty object
  safeProfilePicUrl: SafeResourceUrl;
  showFormsDropdown = false;
  isClassDisabled = true;
  private displayUserInfo1Executed = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private dataService: DataService
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

  countCICSDeptData() {
    this.cicsDeptCount = this.forms.length;
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.username = params['username'];
      this.dept = params['dept'];
      this.dataService.setUsername(this.username);
      this.dataService.setDept(this.dept);

      // Check if user data is stored in sessionStorage and retrieve it
      const storedUserData = sessionStorage.getItem('userData');
      if (storedUserData) {
        this.user = JSON.parse(storedUserData);
      }

      const storedCicsDeptCount = sessionStorage.getItem('cicsDeptCount');
      if (storedCicsDeptCount) {
        this.cicsDeptCount = parseInt(storedCicsDeptCount);
      }

      if (this.username) {
        this.displayUserInfo();
        if (!this.displayUserInfo1Executed) {
          this.displayUserInfo1Executed = true;
          this.displayUserInfo1();
        }
      }
    });
  }

  sanction() {
    this.router.navigate(['/tabadmin1'], { queryParams: { username: this.username } });
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
    localStorage.removeItem('hasLoadedBefore');

    // Reset any user-related variables to their default values
    this.username = '';

    // Redirect the user to the login page and replace the current history entry
    this.router.navigate(['/home']);
    window.location.reload();
    sessionStorage.removeItem('userData');
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
          let profilePic = profilePicNode || '';
          const fallbackImage = 'assets/userpic.png';
          if (!profilePic) {
            profilePic = fallbackImage;
          }

          this.user = {
            name,
            college,
            year,
            profilePic,
          };
          break;
        }
      }

      sessionStorage.setItem('userData', JSON.stringify(this.user));
    });
  }

  displayUserInfo1() {
    this.http.get('assets/data.xml', { responseType: 'text' }).subscribe((xmlData) => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlData, 'application/xml');

      const usersNode = xmlDoc.getElementsByTagName('data');

      for (let i = 0; i < usersNode.length; i++) {
        const form = usersNode[i];
        const srcode = form.getElementsByTagName('srcode')[0]?.textContent;
        const violation = form.getElementsByTagName('violation')[0]?.textContent;
        const dept = form.getElementsByTagName('dept')[0]?.textContent;

        this.forms.push({ srcode, violation, dept });
      }
      this.cicsDeptCount = this.forms.length;

      sessionStorage.setItem('cicsDeptCount', this.cicsDeptCount.toString());
      sessionStorage.setItem('userData', JSON.stringify(this.user));
    });
  }
}

interface User1 {
  users?: number;
}

interface User {
  name?: string;
  college?: string;
  year?: string;
  profilePic?: string;
}
