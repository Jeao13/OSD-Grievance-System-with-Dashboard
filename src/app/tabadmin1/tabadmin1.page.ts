import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


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
  users: User[] = [];
  users2: users2 = {};
  recommendations: string[] = [];
  filteredUsers: any[] = [];
  searchTerm: string = '';
  xmlUrl = 'assets/users.xml';
  showRecommendations: boolean = false;
 


  ngOnInit() {
    this.loadUsernames();
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
      
  
            this.users.push({ username: username !== null ? username : ''});
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
  }

  constructor(private route: ActivatedRoute, private http: HttpClient) {
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
          const yearNode = currentUser.getElementsByTagName('year')[0]?.textContent;
          const profilePicNode = currentUser.getElementsByTagName('profilePic')[0]?.textContent;

          const name = nameNode || '';
          const college = collegeNode || '';
          const year = yearNode || '';
          const profilePic = profilePicNode || '';

          this.users2 = {
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
}
interface users2 {
  name?: string;
  college?: string;
  year?: string;
  profilePic?: string;
}


