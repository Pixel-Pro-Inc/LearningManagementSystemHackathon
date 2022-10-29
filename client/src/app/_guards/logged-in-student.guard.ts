import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from '../_services/shared.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedInStudentGuard implements CanActivate {
  constructor(private shared: SharedService) {}

  canActivate(): boolean {
    let user = this.shared.getUser();

    if (user == null) {
      this.shared.router.navigateByUrl('/');
      return false;
    }

    if (user.accountType == this.shared.AccountTypes.Student) {
      return true;
    }

    this.shared.router.navigateByUrl('/');
    return false;
  }
}
