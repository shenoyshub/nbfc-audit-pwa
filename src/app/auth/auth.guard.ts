// import { inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';
// import { OidcSecurityService } from 'angular-auth-oidc-client';
// import { map, tap } from 'rxjs/operators';

// export const authGuard: CanActivateFn = () => {  
//   const oidcSecurityService = inject(OidcSecurityService);
//   const router = inject(Router);

//   return oidcSecurityService.isAuthenticated$.pipe(
//     map(({ isAuthenticated }) => isAuthenticated),
//     tap(isAuthenticated => {
//       if (!isAuthenticated) {
//         // Save attempted URL
//         const currentUrl = router.url;
//         localStorage.setItem('requestedUrl', currentUrl);

//         // Redirect to IdP login
//         oidcSecurityService.authorize();
//       }
//     })
//   );
// };



 
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot,RouterStateSnapshot, CanActivateFn, Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { catchError, map, of } from 'rxjs';
import { InitalDataService } from '../services/intialdata.service';

 
 
export const authGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    return true; // Temporary allow all for testing purposes
    const oidc = inject(OidcSecurityService);
    return oidc.checkAuth().pipe(
      map(({isAuthenticated}): any => {
        if (isAuthenticated) {
          return true;
        } else { 
          const returnUrl = window.location.href;
          console.log(returnUrl);
          oidc.authorize();  
          //const router = inject(Router);
          //router.navigateByUrl('customer');
          return false;
        }
      }),
      catchError(() => {
        console.error('Auth check failed');
        return of(false);
      })
    );
  };


  export const dataLoader:CanActivateFn = (
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ) => {
    const intialDataService = inject(InitalDataService);
    return intialDataService.init();
  }
