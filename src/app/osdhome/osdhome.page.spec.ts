import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OsdhomePage } from './osdhome.page';

describe('OsdhomePage', () => {
  let component: OsdhomePage;
  let fixture: ComponentFixture<OsdhomePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OsdhomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
