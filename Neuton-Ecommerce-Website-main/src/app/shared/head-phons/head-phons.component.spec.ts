import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadPhonsComponent } from './head-phons.component';

describe('HeadPhonsComponent', () => {
  let component: HeadPhonsComponent;
  let fixture: ComponentFixture<HeadPhonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeadPhonsComponent]
    });
    fixture = TestBed.createComponent(HeadPhonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
