import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OsdnotifPage } from './osdnotif.page';

describe('OsdnotifPage', () => {
  let component: OsdnotifPage;
  let fixture: ComponentFixture<OsdnotifPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OsdnotifPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
