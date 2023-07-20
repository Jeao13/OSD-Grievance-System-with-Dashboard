import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/data.service';


interface User {
  username: string;
}

@Component({
  selector: 'app-tabadmin1',
  templateUrl: './tabadmin1.page.html',
  styleUrls: ['./tabadmin1.page.scss'],
})
export class Tabadmin1Page {
  username: string;
  username1: string;
  message: string;
  message1: string;

  department:string;
 
  users: User[] = [];
  users2: users2 = {};
  recommendations: string[] = [];
  filteredUsers: any[] = [];
  searchTerm: string = '';
  xmlUrl = 'assets/users.xml';
  showRecommendations: boolean = false;

  username3: string | null; // Updated type to allow null values
  xmlData: any;
  matchingData: any[] = [];
  showResults = false;
 


  ngOnInit() {
 

    this.dataService.dept$.subscribe((dept) => {
      if (dept) {
        // Do whatever you want with the dept value here
        
        this.department=dept;
        this.loadUsernames();
        console.log(this.department);
      }
    });
    
  }

  loadUsernames() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        const xmlDoc = xhttp.responseXML;
        if (xmlDoc !== null) {
          const userNodes = xmlDoc.getElementsByTagName('user');
  
          for (let i = 0; i < userNodes.length; i++) {
            const username = userNodes[i].getElementsByTagName('username')[0]?.textContent;
            const role = userNodes[i].getElementsByTagName('role')[0]?.textContent;
            const department = userNodes[i].getElementsByTagName('dept')[0]?.textContent;
  
            // Filter users based on role and department
            if (role === 'student' && department === this.department) {
              this.users.push({ username: username !== null ? username : '' });
            }
          }
  
          this.filteredUsers = this.users;
        }
      }
    };
  
    xhttp.open('GET', this.xmlUrl, true);
    xhttp.send();
  }
  onSearch() {
    if (this.searchTerm) {
      this.recommendations = this.users
        .filter(user => user.username.includes(this.searchTerm))
        .map(user => user.username);
      this.showRecommendations = true;
    } else {
      this.recommendations = [];
      this.showRecommendations = false;
    }
  }

  selectRecommendation(recommendation: string) {
    this.searchTerm = recommendation;
    this.showRecommendations = false;
    this.displayUserInfo()
    this.loadAndDisplayViolationReport()
  }

  constructor(private route: ActivatedRoute, private http: HttpClient, private dataService: DataService,) {
    this.route.queryParams.subscribe((params) => {
      this.username = params['username'];
      if (this.username) {
        // this.saveData();
      }
    });
  }

  saveData() {
   
    const apiUrl = 'http://localhost/modify-xml.php'; // Replace with the actual URL of your PHP script
    const data = {
      srcode: this.username,
      dept: this.username1,
      violation: this.message,
      report: this.message1,
      timestamp: new Date().toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }    ),
      status:'Pending'

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

  addsanctions() {
    const apiUrl1 = 'http://localhost/modify-notif.php';
    const apiUrl = 'http://localhost/modify-sanctions.php'; // Replace with the actual URL of your PHP script
    const data = {
      srcode: this.searchTerm,
      violation: this.message,
      timestamp: new Date().toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }    ),
        

    };

    const data1 = {
      srcode: this.searchTerm,
      violation: 'You have a new sanction!',
      timestamp: new Date().toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }    ),
        

    };

    this.http.post(apiUrl, data).subscribe(
      () => {
        console.log('Data saved successfully');
      },
      (error) => {
        console.error('Error saving data:', error);
      }
    );

    this.http.post(apiUrl1, data1).subscribe(
      () => {
        console.log('Data saved successfully');
      },
      (error) => {
        console.error('Error saving data:', error);
      }
    );
  }

  displayUserInfo() {
   
    this.http.get('assets/users.xml', { responseType: 'text' }).subscribe((xmlData) => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlData, 'application/xml');

      const users = xmlDoc.getElementsByTagName('user');

      for (let i = 0; i < users.length; i++) {
        const currentUser = users[i];
        const currentUsername = currentUser.getElementsByTagName('username')[0]?.textContent;

        if (currentUsername === this.searchTerm) {
          const nameNode = currentUser.getElementsByTagName('name')[0]?.textContent;
          const collegeNode = currentUser.getElementsByTagName('college')[0]?.textContent;
          const sanctions1 = currentUser.getElementsByTagName('sanctions')[0]?.textContent;
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
          const sanctions = sanctions1 || '';



          this.users2 = {
            name,
            college,
            year,
            profilePic,
            sanctions
          };
          break;
        }
      }
    });
  }
  loadAndDisplayViolationReport() {
 

    this.http.get('assets/sanctions.xml', { responseType: 'text' }).subscribe(
      (data) => {
        this.xmlData = data;
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'text/xml');
        const datas = xmlDoc.querySelectorAll('forms'); 

        this.matchingData = [];
        for (let i = 0; i < datas.length; i++) {
          const currentForm = datas[i];
          const srcodeElement = currentForm.querySelector('srcode');
          const srcode = srcodeElement ? srcodeElement.textContent : '';
          if (srcode === this.searchTerm) {
            const violationElement = currentForm.querySelector('violation');
            const violation = violationElement ? violationElement.textContent : '';
  
            const timestampElement = currentForm.querySelector('time');
            const timestamp = timestampElement ? timestampElement.textContent : '';


            this.matchingData.push({ violation,timestamp});
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
interface users2 {
  name?: string;
  college?: string;
  year?: string;
  profilePic?: string;
  sanctions?: string;
}


