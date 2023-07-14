import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forms-student',
  templateUrl: './forms-student.page.html',
  styleUrls: ['./forms-student.page.scss'],
})
export class FormsStudentPage {

  constructor(private router: Router) {}

  goToAnotherPage() {
    this.router.navigate(['']);
  }
  

}
