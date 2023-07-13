import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabadminPage } from './tabadmin.page';

describe('TabadminPage', () => {
  let component: TabadminPage;
  let fixture: ComponentFixture<TabadminPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TabadminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
