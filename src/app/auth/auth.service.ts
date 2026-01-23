// import { Injectable, inject } from '@angular/core';
// import { OidcSecurityService } from 'angular-auth-oidc-client';
// import { map,Observable } from 'rxjs';

// @Injectable({ providedIn: 'root' })
// export class AuthService {
//   private oidc = inject(OidcSecurityService);

//   login(): void {
//     this.oidc.authorize();
//   }

//   logout(): void {
//     this.oidc.logoff();
//   }

//   isAuthenticated$ = this.oidc.isAuthenticated$.pipe(
//     map(r => r.isAuthenticated)
//   );

//   user$ = this.oidc.userData$;

//   getAccessToken(): Observable<string> {
//     return this.oidc.getAccessToken();
//   }
// }

import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EventTypes, OidcSecurityService, PublicEventsService } from 'angular-auth-oidc-client';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';

const ACCESS_TOKEN: string = 'access_token';
const REFRESH_TOKEN: string = 'refresh_token';

const OAUTH_CLIENT = environment.ClIENT_ID;
const OAUTH_SECRET = environment.CLIENT_SECRET;
const API_URL = 'http://localhost:4500/';

/** Mock client-side authentication/authorization service */
@Injectable()
export class AuthService {
  constructor(
    private publicEventService: PublicEventsService,
    private oidcSecurityService: OidcSecurityService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  getAuthorizationToken() {
    return this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN);
  }

  saveToken(token: string): void {
    localStorage.setItem(ACCESS_TOKEN, token);
  }

  saveRefreshToken(refreshToken: string): void {
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
  }

  removeToken(): void {
    localStorage.removeItem(ACCESS_TOKEN);
  }

  removeRefreshToken(): void {
    localStorage.removeItem(REFRESH_TOKEN);
  }

  initOidc(): void {
    this.publicEventService.registerForEvents().subscribe((data: any) => {
      console.log(data);

      if (data.type === EventTypes.TokenExpired) {//8
        // localStorage.setItem("previousUrl", this.router.url);
        // this.oidcSecurityService.authorize();
      }
      if (data.type === EventTypes.IdTokenExpired) {//9
        //  localStorage.setItem("previousUrl", localStorage.getItem("currentUrl") ?? this.router.url);
        // this.oidcSecurityService.authorize();
      }
    });
  }
  logout() {

    this.removeToken();
    this.removeRefreshToken();
    //this.oidcSecurityService.stopAutomaticRefresh();
    this.oidcSecurityService.logoffAndRevokeTokens().subscribe({
      next: () => this.afterLogout(),
      error: () => this.afterLogout()
    });
    this.router.navigateByUrl('');

  }
  private afterLogout() {
    // 3️⃣ Nuke leftover auth state
    localStorage.clear();
    sessionStorage.clear();
    this.oidcSecurityService.checkAuth().subscribe(r => {
      console.log('Auth after logout:', r);
    });
    // 4️⃣ Hard redirect (kills Angular memory state)
    window.location.href = '/';
  }


}
