import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router'; 
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { saveAs } from 'file-saver';

interface Form {
  srcode: string | null;
  violation: string | null;
  dept: string | null;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string;
  dept:string;
  forms: Form[] = [];
  idRequirementCount = 0;
  user: User = {};
  cicsDeptCount = 0;
  user1: User1 = {};
  safeProfilePicUrl: SafeResourceUrl;
  showFormsDropdown = false;
  isClassDisabled = true;
  private displayUserInfo1Executed = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,

    private router: Router,
    private dataService: DataService,

  ) {}

  downloadFile() {
    const fileUrl = 'assets/BatStateU-FO-OSD-06_Request-for-Non-Wearing-of-Uniform_Rev.-02.pdf'; 
  
    this.http.get(fileUrl, { responseType: 'blob' }).subscribe(
      (response) => {
        saveAs(response, 'BatStateU-FO-OSD-06_Request-for-Non-Wearing-of-Uniform_Rev.-02.pdf'); // Save the file locally with the desired name
      },
      (error) => {
        console.error('Error fetching file: ' + error);
        // Handle error, e.g., display an error message
      }
    );
  }

  downloadFile1() {
    const fileUrl = 'assets/BatStateU-FO-OSD-09_Notice-of-Case-Dismissal_Rev.-01.pdf'; // Replace with the path to your file
  
    this.http.get(fileUrl, { responseType: 'blob' }).subscribe(
      (response) => {
        saveAs(response, 'BatStateU-FO-OSD-09_Notice-of-Case-Dismissal_Rev.-01.pdf'); // Save the file locally with the desired name
      },
      (error) => {
        console.error('Error fetching file: ' + error);
        // Handle error, e.g., display an error message
      }
    );
  }

  
  downloadFile2() {
    const fileUrl = 'assets/BatStateU-FO-OSD-08_Call-Slip_Rev.-02.pdf'; 
  
    this.http.get(fileUrl, { responseType: 'blob' }).subscribe(
      (response) => {
        saveAs(response, 'BatStateU-FO-OSD-08_Call-Slip_Rev.-02.pdf'); // Save the file locally with the desired name
      },
      (error) => {
        console.error('Error fetching file: ' + error);
        // Handle error, e.g., display an error message
      }
    );
  }

  downloadFile3() {
    const fileUrl = 'assets/BatStateU-FO-OSD-01_Temporary-Gate-Pass_Rev.-02.pdf'; // Replace with the path to your file
  
    this.http.get(fileUrl, { responseType: 'blob' }).subscribe(
      (response) => {
        saveAs(response, 'BatStateU-FO-OSD-01_Temporary-Gate-Pass_Rev.-02.pdf'); // Save the file locally with the desired name
      },
      (error) => {
        console.error('Error fetching file: ' + error);
        // Handle error, e.g., display an error message
      }
    );
  }

  
  downloadFile4() {
    const fileUrl = 'assets/BatStateU-FO-OSD-05_Student-Incident-Report_Rev.-02.pdf'; 
  
    this.http.get(fileUrl, { responseType: 'blob' }).subscribe(
      (response) => {
        saveAs(response, 'BatStateU-FO-OSD-05_Student-Incident-Report_Rev.-02.pdf'); // Save the file locally with the desired name
      },
      (error) => {
        console.error('Error fetching file: ' + error);
        // Handle error, e.g., display an error message
      }
    );
  }

  downloadFile5() {
    const fileUrl = 'assets/BatStateU-FO-OSD-04_Letter-of-Suspension_Rev.-02.pdf'; // Replace with the path to your file
  
    this.http.get(fileUrl, { responseType: 'blob' }).subscribe(
      (response) => {
        saveAs(response, 'BatStateU-FO-OSD-04_Letter-of-Suspension_Rev.-02.pdf'); // Save the file locally with the desired name
      },
      (error) => {
        console.error('Error fetching file: ' + error);
        // Handle error, e.g., display an error message
      }
    );
  }


  
  downloadFile6() {
    const fileUrl = 'assets/BatStateU-FO-OSD-03_Written-Reprimand-for-Violation-of-Norms-of-Conduct_Rev.-02.pdf'; 
  
    this.http.get(fileUrl, { responseType: 'blob' }).subscribe(
      (response) => {
        saveAs(response, 'BatStateU-FO-OSD-03_Written-Reprimand-for-Violation-of-Norms-of-Conduct_Rev.-02.pdf'); // Save the file locally with the desired name
      },
      (error) => {
        console.error('Error fetching file: ' + error);
        // Handle error, e.g., display an error message
      }
    );
  }

  downloadFile7() {
    const fileUrl = 'assets/BatStateU-FO-OSD-02_Written-Warning-for-Violation-of-Norms-of-Conduct_Rev.-02.pdf'; // Replace with the path to your file
  
    this.http.get(fileUrl, { responseType: 'blob' }).subscribe(
      (response) => {
        saveAs(response, 'BatStateU-FO-OSD-02_Written-Warning-for-Violation-of-Norms-of-Conduct_Rev.-02.pdf'); // Save the file locally with the desired name
      },
      (error) => {
        console.error('Error fetching file: ' + error);
        // Handle error, e.g., display an error message
      }
    );
  }

  toggleClass(event: Event) {
    event.stopPropagation(); // Prevent the event from propagating

    this.isClassDisabled = !this.isClassDisabled;
  }
 
    
  countCICSDeptData() {
    this.cicsDeptCount = this.forms.filter((form) => form.dept === 'CICS').length;
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.username = params['username'];
      this.dept =  params['dept'];
      this.dataService.setUsername(this.username);
      this.dataService.setDept(this.dept);

        // Check if user data is already available in session storage
        const storedUserData = sessionStorage.getItem('userData');
        if (storedUserData) {
          this.user = JSON.parse(storedUserData);
        }
    
        const storedCicsDeptCount = sessionStorage.getItem('cicsDeptCount');
        if (storedCicsDeptCount) {
          this.cicsDeptCount = parseInt(storedCicsDeptCount);
        }

      if (this.username) {
        this.displayUserInfo();
        this.displayUserInfo1()
        if (!this.displayUserInfo1Executed) { // Check if the function has not been executed yet
          this.displayUserInfo1Executed = true; // Set the flag to true after the function execution
        }
      }

      sessionStorage.setItem('username', this.username);
      sessionStorage.setItem('dept', this.dept);
      sessionStorage.setItem('userData', JSON.stringify(this.user));
    });
  }


  sanction() {
    this.router.navigate(['/tabadmin1'], { queryParams: { username: this.username } });
  }

  file() {
    this.router.navigate(['/forgot-password'], { queryParams: { username: this.username } });
  }

  toggleFormsDropdown() {
    this.showFormsDropdown = !this.showFormsDropdown;
  }
 
  logout() {
    localStorage.removeItem('userToken');
  sessionStorage.clear();
  localStorage.removeItem('hasLoadedBefore');

  // Reset any user-related variables to their default values
  this.username = '';

  // Redirect the user to the login page and replace the current history entry
  this.router.navigate(['/home']);
  window.location.reload();
  }

  displayUserInfo() {
   
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
          let profilePic = profilePicNode || '';
          const fallbackImage = 'assets/userpic.png';
          if (!profilePic) {
            profilePic = fallbackImage;
          }

          this.user = {
            name,
            college,
            year,
            profilePic,
          };

          break;
        }
      }
      
      sessionStorage.setItem('userData', JSON.stringify(this.user));
    });
  }

  displayUserInfo1() {
   
    this.http.get('assets/data.xml', { responseType: 'text' }).subscribe((xmlData) => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlData, 'application/xml');

      const usersNode = xmlDoc.getElementsByTagName('data');
      this.cicsDeptCount = 0;



      for (let i = 0; i < usersNode.length; i++) {
        const form = usersNode[i];
        const srcode = form.getElementsByTagName('srcode')[0]?.textContent;
        const violation = form.getElementsByTagName('violation')[0]?.textContent;
        const dept = form.getElementsByTagName('dept')[0]?.textContent;

        this.forms.push({ srcode, violation, dept});

        if (dept === this.dept) { // Check if <dept> is "CICS"
          this.cicsDeptCount++; // Increment the count for <data> with <dept> of CICS
        }
      }
      sessionStorage.setItem('cicsDeptCount', this.cicsDeptCount.toString());
      sessionStorage.setItem('userData', JSON.stringify(this.user));
    });
  }
}

interface User1 {
  users?: number;
}

interface User {
  name?: string;
  college?: string;
  year?: string;
  profilePic?: string;
}