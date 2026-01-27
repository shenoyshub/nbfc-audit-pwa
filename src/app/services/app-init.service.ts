import { DOCUMENT, Inject, Injectable, Renderer2 } from "@angular/core";
import { NavigationEnd, NavigationStart, Router } from "@angular/router";
import { OidcSecurityService } from "angular-auth-oidc-client";
import { AppService } from "./app.service";
import { AuthService } from "./auth.service";
import { distinctUntilChanged, filter, map, withLatestFrom } from "rxjs";
import { InitalDataService } from "./intialdata.service";

@Injectable({ providedIn: 'root' })
export class AppInitService {
  private googleMapsLoaded = false;

  constructor(
    private router: Router,
    private location: Location,
    private auth: AuthService,
    private app: AppService,
    private renderer: Renderer2,
    private initialDataService: InitalDataService,
    private oidcSecurityService: OidcSecurityService,
    @Inject(DOCUMENT) private document: Document
  ) {}

    init(): void {
    this.storeInitialUrl();
    this.trackNavigation();
    this.trackRequestedUrl();
    this.auth.initOidc();
    this.loadGoogleMapsAfterLogin();
  }

private storeInitialUrl(): void {
  try {
    //const path = this.location.path()?.trim();
     const path = this.router.url?.trim();
    if (path) {
      localStorage.setItem('previousUrl', path);
      console.log(`Stored previousUrl: ${path}`);
    }
  } catch (error) {
    console.warn('Unable to store previous URL:', error);
  }
}


  private trackNavigation() {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        localStorage.setItem('currentUrl', e.urlAfterRedirects);
      });
  }

  private trackRequestedUrl() {
    this.router.events
      .pipe(
        filter(e => e instanceof NavigationStart),
        withLatestFrom(this.oidcSecurityService.isAuthenticated$)
      )
      .subscribe(([event, auth]: any) => {
        if (!auth.isAuthenticated && !event.url.includes('login-redirect')) {
          localStorage.setItem('requestedUrl', event.url);
        }
      });
  }

  private loadGoogleMapsAfterLogin() {
    this.oidcSecurityService.isAuthenticated$
      .pipe(
        map(a => a.isAuthenticated),
        distinctUntilChanged(),
        filter(auth => auth && !this.googleMapsLoaded)
      )
      .subscribe(() => {
        this.app.isGoogleApiEnabled().subscribe(res => {
          this.initialDataService.googleApiSettings = res;
          this.appendGoogleMapsScript(res.apiKey);
        });
      });
  }

  private appendGoogleMapsScript(apiKey: string) {
    const script = this.renderer.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;
    this.renderer.appendChild(this.document.body, script);
    this.googleMapsLoaded = true;
  }
}
