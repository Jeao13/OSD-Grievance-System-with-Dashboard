import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  showSplash = true;

  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.showSplash = false;
      this.router.navigateByUrl('/home'); // Replace 'home' with the desired landing page after the splash screen
    }, 5000); // Adjust the timeout value (in milliseconds) as needed
  }
}
