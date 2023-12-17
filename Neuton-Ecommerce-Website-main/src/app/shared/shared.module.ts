import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { CarouselModule } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'primeng/carousel';
import { RouterModule, Routes } from '@angular/router';
import { FeaturedMobilesComponent } from './featured-mobiles/featured-mobiles.component';
import { BrowseCategoriesComponent } from './browse-categories/browse-categories.component';
import { FilterCategoryComponent } from './filter-category/filter-category.component';
import { TreeSelectModule } from 'primeng/treeselect';
import { FormsModule } from '@angular/forms';
import { TreeModule } from 'primeng/tree';
import { SliderModule } from 'primeng/slider';
import { FilteredProductsComponent } from './filtered-products/filtered-products.component';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { SidebarModule } from 'primeng/sidebar';
import { DataViewModule } from 'primeng/dataview';

import { BrowserModule } from '@angular/platform-browser';
import { TagModule } from 'primeng/tag';
import { HeadPhonsComponent } from './head-phons/head-phons.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    NavComponent,
    FooterComponent,
    HeaderComponent,
    FeaturedMobilesComponent,
    BrowseCategoriesComponent,
    FilterCategoryComponent,
    FilteredProductsComponent,
    HeadPhonsComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    CarouselModule,
    RouterModule,
    TreeSelectModule,
    TreeModule,
    FormsModule,
    SliderModule,
    ConfirmDialogModule,
    ToastModule,
    DialogModule,
    SidebarModule,
    DataViewModule,    
  ],
  exports:[
    NavComponent,
    FooterComponent,
    HeaderComponent,
    FeaturedMobilesComponent,
    BrowseCategoriesComponent,
    FilterCategoryComponent,
    FilteredProductsComponent,
    FormsModule,
    HeadPhonsComponent,
    SpinnerComponent
  ]
})
export class SharedModule { }
