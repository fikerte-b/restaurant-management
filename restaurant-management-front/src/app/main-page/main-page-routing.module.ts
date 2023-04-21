import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillsComponent } from './bills/bills.component';
import { MainComponent } from './main.component';
import { AddMealComponent } from './meals/add-meal/add-meal.component';
import { MealsComponent } from './meals/meals.component';
import { UpdateMealComponent } from './meals/update-meal/update-meal.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  { path: '', component: MainComponent,
     children: [
      { path: 'orders', component: OrdersComponent },
      {path: 'meals', component:MealsComponent},
      {path: 'bills', component:BillsComponent},
      {path: 'meals/add', component: AddMealComponent},
      {path: 'meals/:meal_id/update', component:UpdateMealComponent},
      
     ]
    }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
