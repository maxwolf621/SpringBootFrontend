import { environment } from 'src/environments/environment';

export const $providers = [
    { name: "google", icon: "fab:fa-google", color: "#EA4335", contrast: "#FFFFFF" ,  url : `${environment.apiOauth2Login}/google?redirect_uri=${environment.apiOAuth2RedirectUri}`},
    { name: "github", icon: "fab:fa-github", color: "#FFFFFF", contrast: "#FFFFFF" , url : `${environment.apiOauth2Login}/github?redirect_uri=${environment.apiOAuth2RedirectUri}`}
];