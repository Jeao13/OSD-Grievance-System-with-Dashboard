import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private usernameSubject = new BehaviorSubject<string | null>(null);
  public username$ = this.usernameSubject.asObservable();

  setUsername(username: string | null) {
    this.usernameSubject.next(username);
  }

  private deptSubject = new BehaviorSubject<string | null>(null);
  dept$ = this.deptSubject.asObservable();

  setDept(dept: string) {
    this.deptSubject.next(dept);
  }
}
