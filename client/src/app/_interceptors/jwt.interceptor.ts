import { HttpInterceptorFn } from '@angular/common/http';
import { User } from '../_models/user';
import { inject } from '@angular/core';
import { AccountService } from '../_services/account/account.service';
import { take } from 'rxjs/operators';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  let currentUser:User
  const accountService = inject(AccountService)

  accountService.currentUser$.pipe(take(1)).subscribe(user=>{
    currentUser = user
    if(currentUser){
    req = req.clone(
      {
        setHeaders:{
          Authorization: 'Bearer '+currentUser.token
        }
      }
    )
    }
  })
  
  return next(req);
};
