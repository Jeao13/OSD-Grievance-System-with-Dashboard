import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tabadmin3Page } from './tabadmin3.page';

describe('Tabadmin3Page', () => {
  let component: Tabadmin3Page;
  let fixture: ComponentFixture<Tabadmin3Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Tabadmin3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
