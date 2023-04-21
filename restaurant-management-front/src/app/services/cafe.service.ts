import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IMeal } from '../shared-elements/meal.interface';

@Injectable({
  providedIn: 'root',
})
export class CafeService {
  constructor(private httpClient: HttpClient) {}

  // meal services
  getMealsByCategory(category: any) {
    return this.httpClient.get(
      environment.apiUrl + 'meals/category/' + category
    );
  }

  getMealsById(id: string) {
    return this.httpClient.get<{
      data: {
        _id: string;
        name: string;
        category: string;
        price: number;
        ingredients: string[];
      };
    }>(environment.apiUrl + 'meals/' + id);
  }

  getMeals() {
    return this.httpClient.get<{ success: boolean; data: any }>(
      environment.apiUrl + 'meals/'
    );
  }

  addMeal(meal: any) {
    return this.httpClient.post<{ success: boolean; data: any }>(
      environment.apiUrl + 'meals/' + '/add',
      meal
    );
  }

  updateMealById(
    meal: {
      _id: string;
      name: string;
      category: string;
      price: number;
      ingredients: string[];
    },
    meal_id: string
  ) {
    return this.httpClient.patch<{ sucess: boolean }>(
      environment.apiUrl + 'meals/' + meal_id + '/update',
      meal
    );
  }

  deleteMealById(meal_id: string) {
    return this.httpClient.delete<{ success: boolean }>(
      environment.apiUrl + 'meals/' + meal_id + '/delete'
    );
  }

  // for Payment checkout
  createCheckoutSession(stripeToken: any):Observable<any>{
    return this.httpClient.post<any>(
      environment.apiUrl + 'bills/' + 'create_checkout_session',
      {token:stripeToken}
    );
  }
}
