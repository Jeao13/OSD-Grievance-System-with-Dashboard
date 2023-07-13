import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tabadmin2Page } from './tabadmin2.page';

describe('Tabadmin2Page', () => {
  let component: Tabadmin2Page;
  let fixture: ComponentFixture<Tabadmin2Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Tabadmin2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
