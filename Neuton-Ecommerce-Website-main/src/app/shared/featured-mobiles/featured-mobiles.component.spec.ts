import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedMobilesComponent } from './featured-mobiles.component';

describe('FeaturedMobilesComponent', () => {
  let component: FeaturedMobilesComponent;
  let fixture: ComponentFixture<FeaturedMobilesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeaturedMobilesComponent]
    });
    fixture = TestBed.createComponent(FeaturedMobilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
