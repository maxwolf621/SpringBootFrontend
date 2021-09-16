import { environment } from 'src/environments/environment';

export const $providers = [

    { name: "google", icon: "fab:fa-google", color: "#EA4335", contrast: "#FFFFFF" ,  url : `${environment.apiOauth2Login}/google`},
    //{ name: "facebook", icon: "fab:fa-facebook", color: "#3B5998", contrast: "#FFFFFF" },
    //{ name: "twitter", icon: "fab:fa-twitter", color: "#55ACEE", contrast: "#FFFFFF",  url :`${environment.apiOauth2Login}`},
    //{ name: "linkedin", icon: "fab:fa-linkedin", color: "#0077b5", contrast: "#FFFFFF" },
    { name: "github", icon: "fab:fa-github", color: "#FFFFFF", contrast: "#FFFFFF" , url : `${environment.apiOauth2Login}/github`}
];