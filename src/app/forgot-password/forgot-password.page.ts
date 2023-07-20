import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import {ToastController } from '@ionic/angular';

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

  constructor(private route: ActivatedRoute, private http: HttpClient,   private toastController: ToastController) {
    this.route.queryParams.subscribe((params) => {
      this.username = params['username'];
      if (this.username) {
        // this.saveData();
      }
    });
  }

  showAlertMessage() {
    this.showToastMessage();
  }

  async showToastMessage() {
    const toast = await this.toastController.create({
      message: 'Your report has been submitted',
      duration: 1000, // Show the toast for 2 seconds
      position: 'middle'
    });
    toast.present();
  }


  saveData() {
    const apiUrl1 = 'http://localhost/modify-adnotif.php';
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

    
    const data1 = {
      
      dept: this.username1,
      violation: 'There is a new report',
      timestamp: new Date().toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }    ),
        

    };

    this.http.post(apiUrl1, data1).subscribe(
      () => {
        console.log('Data saved successfully');
        this.showAlertMessage();
      },
      (error) => {
        console.error('Error saving data:', error);
      }
    );

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