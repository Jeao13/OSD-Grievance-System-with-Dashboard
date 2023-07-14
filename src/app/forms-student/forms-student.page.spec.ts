import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsStudentPage } from './forms-student.page';

describe('FormsStudentPage', () => {
  let component: FormsStudentPage;
  let fixture: ComponentFixture<FormsStudentPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FormsStudentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
