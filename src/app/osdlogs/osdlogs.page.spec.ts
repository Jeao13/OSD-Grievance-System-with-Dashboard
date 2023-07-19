import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OsdlogsPage } from './osdlogs.page';

describe('OsdlogsPage', () => {
  let component: OsdlogsPage;
  let fixture: ComponentFixture<OsdlogsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OsdlogsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
