import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SnackbarService } from './services/snackbar.service';
import { GlobalVariables } from './shared-elements/global-variables';
import { StateService } from './services/state.service';

@Injectable({
  providedIn: 'root',
})
export class CheckTokenGuard implements CanActivate {
  private stateService = inject(StateService);
  private snackbarService = inject(SnackbarService);
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.stateService.state.value.token ? true : false;

    //     if(this.userService.state?.value?.token)
    //     return true;

    //  this.router.navigate(['/']);
    //  return false;
    // return this.stateService.state.value.token ? true : this.snackbarService.openSnackBar(GlobalVariables.unauthorized, GlobalVariables.error);
  }
}
