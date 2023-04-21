import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IMeal } from 'src/app/shared-elements/meal.interface';
import { CafeService } from 'src/app/services/cafe.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalVariables } from 'src/app/shared-elements/global-variables';
import { map } from 'rxjs';

@Component({
  selector: 'app-update-meal',
  templateUrl: './update-meal.component.html',
  styleUrls: ['./update-meal.component.scss']
})
export class UpdateMealComponent implements OnInit {
  meal_id!: string;
  meals!: IMeal[];
  respondMessage: any;
  
  private router = inject(Router);
  private snackbar = inject(SnackbarService);
  private cafeService = inject(CafeService);
  private activatedRoute = inject(ActivatedRoute);

  form = inject(FormBuilder).nonNullable.group({
    name: '',
    category: '',
    price: '',
    ingredients: [''],
  });

  constructor() {
    this.activatedRoute.paramMap
    .pipe(map((params)=> params.get('meal_id') as string))
    .subscribe((response)=>{
      this.meal_id = response;
    });
  }
  ngOnInit(): void {
    this.cafeService.getMealsById(this.meal_id).subscribe((response)=>{
      const {data: meal } = response;
      this.form.patchValue(meal as any)
    })
  }

   

  updateSubmit() {
    this.cafeService
    .updateMealById(
       this.form.value as 
       any,
        this.meal_id
      )
      .subscribe((response) => {
        this.snackbar.openSnackBar(GlobalVariables.mealUpdated, 'success');
        this.router.navigate(['mainPage', 'meals']);
      });
  }
}
