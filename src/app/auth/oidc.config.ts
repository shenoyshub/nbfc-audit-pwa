import { OpenIdConfiguration } from 'angular-auth-oidc-client';
import { environment } from '../../environments/environment';
import { PassedInitialConfig } from 'angular-auth-oidc-client';
//export const oidcConfig: OpenIdConfiguration = environment.oicdConfig;
export const oidcConfig: PassedInitialConfig ={ config: environment.oicdConfig} ;
