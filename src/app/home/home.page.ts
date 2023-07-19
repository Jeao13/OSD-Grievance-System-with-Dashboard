import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  username: string;
  password: string;
  dept:string | null;
  loginFailed: boolean = false;

  constructor(private navCtrl: NavController,private router: Router, private http: HttpClient) {}

  

  validateForm(): boolean {
    
    this.http.get('assets/users.xml', { responseType: 'text' }).subscribe(
      (xmlData) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlData, 'text/xml');

        // Extract user data from the XML
        const users = xmlDoc.getElementsByTagName('user');
        let authenticated = false;
        let authenticated1 = false;
        

        for (let i = 0; i < users.length; i++) {
          const user = users[i];
          const xmlUsername = user.getElementsByTagName('username')[0]?.textContent;
          const xmlPassword = user.getElementsByTagName('password')[0]?.textContent;
          const xmlrole = user.getElementsByTagName('role')[0]?.textContent;
          const xmldept = user.getElementsByTagName('dept')[0]?.textContent;

          if (this.username === xmlUsername && this.password === xmlPassword && xmlrole ==='student') {
            authenticated = true;
            break;  
          }
          else if(this.username === xmlUsername && this.password === xmlPassword && xmlrole ==='coordinator'){
            authenticated1 = true;
            this.dept = xmldept;
            break;
          }
        }

        if (authenticated) {
          // Login successful
          this.router.navigate(['/tabs/tab1'], { queryParams: { username: this.username} });
          this.username = '';
          this.password = '';
        }  else if (authenticated1){
          this.router.navigate(['/tabadmin/login'], { queryParams: { username: this.username, dept:this.dept} });
          this.username = '';
          this.password = '';
        

        }  else {
          // Login failed
          this.loginFailed = true;
          console.log('Invalid username or password');
        }
      },
      (error) => {
        // Handle error
        console.log('Error: ', error);
      }
    );
    return true;
  }

}
