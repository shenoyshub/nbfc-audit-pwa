import { OpenIdConfiguration } from 'angular-auth-oidc-client';

export const oidcConfig: OpenIdConfiguration = {
  authority: 'https://auth.your-idp.com',
  clientId: 'nbfc-audit-pwa',

  redirectUrl: window.location.origin,
  postLogoutRedirectUri: window.location.origin,

  responseType: 'code',
  scope: 'openid profile email offline_access',

  silentRenew: true,
  useRefreshToken: true,
  renewTimeBeforeTokenExpiresInSeconds: 60
};
