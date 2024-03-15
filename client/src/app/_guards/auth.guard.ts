import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from '../_services/account/account.service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AccountService)
  const toastr = inject(ToastrService)

  return authService.currentUser$.pipe(
    map(user=>{
      if(user) return true
      toastr.error("You should not pass")
      return false
    })
  );
};
