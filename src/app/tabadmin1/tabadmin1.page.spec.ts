import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tabadmin1Page } from './tabadmin1.page';

describe('Tabadmin1Page', () => {
  let component: Tabadmin1Page;
  let fixture: ComponentFixture<Tabadmin1Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Tabadmin1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
