import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredProductsComponent } from './filtered-products.component';

describe('FilteredProductsComponent', () => {
  let component: FilteredProductsComponent;
  let fixture: ComponentFixture<FilteredProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilteredProductsComponent]
    });
    fixture = TestBed.createComponent(FilteredProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
