// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


export const environment = {
  production: false,
  apiUrl    : 'http://localhost:8080',
  apiAuth   : "http://localhost:8080/api/auth",
  apiPost   : 'http://localhost:8080/api/post',
  apiSub    : 'http://localhost:8080/api/sub',
  apiComment: 'http://localhost:8080/api/comment',
  apiVote   : 'http://localhost:8080/api/vote',
  apiBookMark:'http://localhost:8080/api/bookmark',
  apiUserProfile:'http://localhost:8080/api/userprofile',
  apiOauth2Login:'http://localhost:8080/oauth2/authorization',
  apiLogout : 'http://localhost:8080/api/auth/logout',
  apiTag: 'http://localhost:8080/api/tag',
  apiOAuth2RedirectUri:'http://locahost:4200/oauth2/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */