import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IMeal } from '../../shared-elements/meal.interface';
import { CafeService } from 'src/app/services/cafe.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalVariables } from 'src/app/shared-elements/global-variables';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss'],
})
export class MealsComponent {
  meal!: IMeal;
  num: number = 0;
  meals!: IMeal[];
  role: any;
  localStored_data: any;
  result: any;
  respondMessage!: string;

  id!: string;
  subscription!: Subscription;

  constructor(
    private service: CafeService,
    private router: Router,
    private snackBar: SnackbarService
  ) {
    this.subscription = this.service.getMeals().subscribe((response) => {
      this.meals = response.data;
      this.result = JSON.parse(localStorage.getItem('STATE') as any);

      this.role = this.result.role;
      console.log(
        this.result,
        this.role,
        'the user data in meals from local storage'
      );
    });
  }

  ngOnInit(): void {}

  handleAdd() {
    if (this.role == 'manager') {
      this.router.navigate(['/mainPage', 'meals', 'add']);
    } else this.snackBar.openSnackBar(GlobalVariables.unauthorized, 'success');
  }

  handleUpdate(meal_id: string) {
    if (this.role == 'manager') {
      this.router.navigate(['/mainPage', 'meals', `${meal_id}`, 'update']);
    } else this.snackBar.openSnackBar(GlobalVariables.unauthorized, 'success');
    
  }

  handleDelete(meal_id: string) {
    if (this.role == 'manager') {
      this.service.deleteMealById(meal_id).subscribe(() => {
        this.meals = this.meals.filter((meal) => meal._id !== meal_id);
      });
    } else this.snackBar.openSnackBar(GlobalVariables.unauthorized, 'success');
    
  }

    ngOnDestroy(): void {
       this.subscription.unsubscribe();
    }
}
