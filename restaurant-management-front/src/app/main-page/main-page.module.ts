import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialComponentModule } from '../angular-material-component/angular-material-component.module';
import { MainPageRoutingModule } from './main-page-routing.module';
import { MainComponent } from './main.component';
import { HeaderComponent } from './header/header.component';
import { MealsComponent } from './meals/meals.component'
import { OrdersComponent } from './orders/orders.component';
import { BillsComponent } from './bills/bills.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddMealComponent } from './meals/add-meal/add-meal.component';
import { UpdateMealComponent } from './meals/update-meal/update-meal.component';


@NgModule({
  declarations: [MainComponent, HeaderComponent, MealsComponent, OrdersComponent, BillsComponent, AddMealComponent, UpdateMealComponent],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    AngularMaterialComponentModule,
    ReactiveFormsModule,
    FormsModule
  ],
})
export class MainPageModule {}
