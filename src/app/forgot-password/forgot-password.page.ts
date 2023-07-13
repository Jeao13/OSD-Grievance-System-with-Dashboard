import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {
  username: string;
  username1: string;
  message: string;
  message1: string;

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
}
