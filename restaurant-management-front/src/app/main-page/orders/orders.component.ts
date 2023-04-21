import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CafeService } from 'src/app/services/cafe.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalVariables } from 'src/app/shared-elements/global-variables';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent {
  orderForm: any = FormGroup;
  meals: any = [];
  price: any;
  totalAmount: number = 0;
  total: number = 0;
  quantity: number = 0;
  respondMessage: any;
  paymentHandler: any = null;
  displayedColumns: string[] = [
    'mealName',
    'category',
    'price',
    'quantity',
    'total',
    'delete',
  ];
  dataSource: any = [];
  categories: any = [
    'Appetizers',
    'Breakfast',
    'Lunch',
    'Dinner',
    'Dessert',
    'Drinks',
  ];

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: SnackbarService,
    private cafeService: CafeService,
    private router: Router,
  ) {}


  ngOnInit(): void {
    this.orderForm = this.formBuilder.group({
      customerName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      category: ['', [Validators.required]],
      mealName: ['', [Validators.required]],
      price: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      total: ['', [Validators.required]],
    });

    this.invokeStripe();
  }



  getMealsByCategory(value: any) {
    this.cafeService.getMealsByCategory(value).subscribe(
      (response: any) => {
        this.meals = response.data;
      },
      (error: any) => {
        if (error.error?.message) {
          this.respondMessage = error.error?.message;
        } else {
          this.respondMessage = GlobalVariables.customError;
        }
        this.snackBar.openSnackBar(this.respondMessage, GlobalVariables.error);
      }
    );
  }


  getMealDetails(data: any) {
    this.cafeService.getMealsById(data._id).subscribe(
      (response: any) => {
        this.price = response.data.price;
        this.orderForm.controls['price'].setValue(this.price);
      },
      (error: any) => {
        if (error.error?.message) {
          this.respondMessage = error.error?.message;
        } else {
          this.respondMessage = GlobalVariables.customError;
        }
        this.snackBar.openSnackBar(this.respondMessage, GlobalVariables.error);
      }
    );
  }

  setTotalPerMeal(e: any) {
    this.quantity = e.target.value;
    this.orderForm.controls['quantity'].setValue(this.quantity);

    if (this.quantity > 0) {
      this.total =
        this.orderForm.controls['quantity'].value *
        this.orderForm.controls['price'].value;
      this.orderForm.controls['total'].setValue(this.total);
    } else if (this.quantity == null) {
      this.total = 1;
    }
  }

  addOnClick() {
    let formData = this.orderForm.value;
    this.totalAmount = this.totalAmount + this.total;

    this.dataSource.push({
      mealName: formData.mealName.name,
      category: formData.category,
      price: formData.price,
      quantity: formData.quantity,
      total: formData.total,
    });
    this.dataSource = [...this.dataSource];

    this.snackBar.openSnackBar(GlobalVariables.mealAdded, 'success');
  }


  deleteOnClick(data: any, element: any) {
    this.totalAmount = this.totalAmount - element.total;
    this.dataSource.splice(data, 1);
    this.dataSource = [...this.dataSource];
  }

  //for payment....
  orderSubmitOnClick(amount: number) {
   
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51MUE07LVvcHCyDgMaFmyBFn3ZJghLmWkw5ZxRz1HwUT1scYhJDz5O5xoS8iwCedzwgCtiYzHWldFJnC2pNy8RGR600ffUq6Bli',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken, 'the stripe token');
        alert('Thank you for your payment!');
        paymentStripe(stripeToken);
        
      },
    });

    const paymentStripe = (stripeToken: any) => {
      this.cafeService
        .createCheckoutSession(stripeToken)
        .subscribe((data: any) => {
          console.log(data);
        });
    };
    paymentHandler.open({
      name: 'Gursha Restaurant',
      description: 'Restaurant Service Payment',
      amount: amount * 100,
    });

   
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      window.document.body.appendChild(script);
    }
   
  }


}
