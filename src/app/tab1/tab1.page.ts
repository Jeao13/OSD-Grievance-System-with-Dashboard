import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  username: string;
  user: User;
  safeProfilePicUrl: SafeResourceUrl;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.username = params['username'];
  

      const { name, college, year, profilePic } = params;
      this.user = { name, college, year, profilePic };
  
      if (this.username) {
        this.displayUserInfo();
      }
    });
  }

  displayUserInfo() {
    console.log('Username in tab1.page.ts:', this.username);
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
}
interface User {
  name: string;
  college: string;
  year: string;
  profilePic: string;
}