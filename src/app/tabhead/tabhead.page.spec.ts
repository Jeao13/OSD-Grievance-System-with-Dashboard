import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabheadPage } from './tabhead.page';

describe('TabheadPage', () => {
  let component: TabheadPage;
  let fixture: ComponentFixture<TabheadPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TabheadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
