import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  showSplash = true;

  constructor(private router: Router, private location: Location,private dataService: DataService) {}

  ngOnInit() {
    const hasLoadedBefore = localStorage.getItem('hasLoadedBefore');
    const previousUrl = localStorage.getItem('previousUrl');

    if (hasLoadedBefore) {
      this.showSplash = false;
      if (previousUrl) {
        this.router.navigateByUrl(previousUrl);
      } else {
        this.navigateToLandingPage();
      }
    } else {
      setTimeout(() => {
        this.showSplash = false;
        this.navigateToLandingPage();
      }, 2000); // Adjust the timeout value (in milliseconds) as needed

      localStorage.setItem('hasLoadedBefore', 'true');
    }

    // Store the current URL to navigate back to it on reload
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        localStorage.setItem('previousUrl', event.urlAfterRedirects);
      }
    });

    this.dataService.setAppComponent(this);
  }

  navigateToLandingPage() {
    this.router.navigateByUrl('/home'); // Replace 'home' with the desired landing page after the splash screen
  }

  reloadSplashScreen() {
    this.showSplash = true;
    setTimeout(() => {
      this.showSplash = false;
      this.router.navigateByUrl('/home'); // Replace 'home' with the desired landing page after the splash screen
    }, 2000); // Adjust the timeout value (in milliseconds) as needed
  }
}
