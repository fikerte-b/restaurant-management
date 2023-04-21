import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CafeService } from 'src/app/services/cafe.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalVariables } from 'src/app/shared-elements/global-variables';

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.scss'],
})
export class AddMealComponent {
  meals!: any;
  respondMessage: any;
  
  private router = inject(Router);
  private snackbar = inject(SnackbarService);
  private cafeServicee = inject(CafeService);

  form = inject(FormBuilder).nonNullable.group({
    name: '',
    category: '',
    price: '',
    ingredients: '',
  });

  constructor() {}
  submit() {
    console.log();

    let copyForm = { ...this.form.value };
    console.log(copyForm);
    this.cafeServicee
      .addMeal(
        copyForm as any
      )
      .subscribe((response) => {
        this.snackbar.openSnackBar(GlobalVariables.mealAdded, 'success');
        this.router.navigate(['mainPage', 'meals']);
      });
  }
}
