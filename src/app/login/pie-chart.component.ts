import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Form {
  srcode: string | null;
  violation: string | null;
  dept: string | null;
}

@Component({
  selector: 'app-pie-chart',
  template: `
    <div class="chart-container">
      <ngx-charts-pie-chart
        [results]="chartData"
        [view]="[400, 300]"

        (select)="onSelect($event)"
      >
      </ngx-charts-pie-chart>
    </div>
  `,
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent {
  @Input() data: any[];
  onSelect: (event: any) => void;
  idRequirementCount = 0;
  ClassroomCount = 0;
  UniformCount = 0;
  FacilitiesCount= 0;
  AcademicCount = 0;
  forms: Form[] = [];
  user1: User1 = {};
  chartData: any[] = [
    { name: 'Classroom Rules and Regulations', value: this.ClassroomCount },
    { name: 'ID Requirement', value: this.idRequirementCount },
    { name: 'Proper Uniform, Dress Code and Other Related Rules/Regulations', value: this.UniformCount },
    { name: 'University Facilities and Premises', value: this.FacilitiesCount },
    { name: 'Academic Dishonesty', value: this.AcademicCount },
  ];
  legendSpacing = 10;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.displayUserInfo1();
  }

  displayUserInfo1() {
    this.http.get('assets/data.xml', { responseType: 'text' }).subscribe((xmlData) => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlData, 'application/xml');

      const usersNode = xmlDoc.getElementsByTagName('data');
     
      for (let i = 0; i < usersNode.length; i++) {
        const form = usersNode[i];
        const srcode = form.getElementsByTagName('srcode')[0]?.textContent;
        const violation = form.getElementsByTagName('violation')[0]?.textContent;
        const dept = form.getElementsByTagName('dept')[0]?.textContent;

        this.forms.push({ srcode, violation, dept });

        if (violation === 'ID Requirement' && dept ==='CICS') {
          this.idRequirementCount++;
        }

        else if (violation === 'Classroom Rules and Regulations' && dept ==='CICS') {
            this.ClassroomCount++;
          }

        else if (violation === 'Proper Uniform, Dress Code and Other Related Rules/Regulations' && dept ==='CICS') {
            this.UniformCount++;
          }

        else if (violation === 'University Facilities and Premises' && dept ==='CICS') {
            this.FacilitiesCount++;
          }

        else if (violation === 'Academic Dishonesty' && dept ==='CICS') {
            this.AcademicCount++;
          }
      }

      // Update the chartData with the updated idRequirementCount
      this.chartData = this.chartData.map((item) => {
        if (item.name === 'ID Requirement') {
          return { ...item, value: this.idRequirementCount };
        }

        else if (item.name === 'Classroom Rules and Regulations') {
            return { ...item, value: this.ClassroomCount };
          }

          
        else if (item.name === 'Proper Uniform, Dress Code and Other Related Rules/Regulations') {
            return { ...item, value: this.UniformCount };
          }

          else if (item.name === 'University Facilities and Premises') {
            return { ...item, value: this.FacilitiesCount };
          }

          
        else if (item.name === 'Academic Dishonesty') {
            return { ...item, value: this.AcademicCount };
          }
        return item;
      });
    });
  }
}

interface User1 {
  users?: number;
}
