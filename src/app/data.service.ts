import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppComponent } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  private appComponent: AppComponent;
  private usernameSource = new BehaviorSubject<string | null>(null);

  // Observable to subscribe to the username changes
  username$ = this.usernameSource.asObservable();

  // Method to set the username value
  setUsername(username: string | null) {
    this.usernameSource.next(username);
  }

  private deptSubject = new BehaviorSubject<string | null>(null);
  dept$ = this.deptSubject.asObservable();

  setDept(dept: string) {
    this.deptSubject.next(dept);
  }
  setAppComponent(appComponent: AppComponent) {
    this.appComponent = appComponent;
  }
  reloadSplashScreen() {
    if (this.appComponent) {
      this.appComponent.reloadSplashScreen();
    }
  }
}

