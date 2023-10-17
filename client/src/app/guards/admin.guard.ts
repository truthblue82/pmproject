import { ActivatedRoute, ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';
export const adminGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router: Router = inject(Router)  ;
  const userSvc: UserService = inject(UserService);
  let users:User[] = [];

  userSvc.getCurrentUser().subscribe((userData) => {
    users = userData;
  })
  if(users.length > 0) {
    const role = users[0].roles[0];
    if(role === "ROLE_ADMIN") return true;
    else {
      router.createUrlTree(['/']);
      return false;
    }
  } else {
    router.createUrlTree(['/']);
    return false;
  }
};
