import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';


interface OAuth2QueryParameter{
  token ?: string,
  error ?: string
}

@Component({
  selector: 'app-oauth2',
  templateUrl: './oauth2.component.html',
  styleUrls: ['./oauth2.component.scss']
})
export class Oauth2Component implements OnInit {

  hidePassword = true;

  oAuth2QueryParameter : OAuth2QueryParameter = {
    token : "",
    error : ""
  } 

  constructor(
    private activateRoute: ActivatedRoute,
    private localStorage : LocalStorageService) { }

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe
    (
      (queryParameters) =>{
        this.oAuth2QueryParameter = {
          token !: queryParameters.token,
          error !: queryParameters.error
        }
        console.info(this.oAuth2QueryParameter);      
        this.localStorage.store('Token', this.oAuth2QueryParameter.token);
      }, (error) =>{
        console.warn("Error" + error);
      }
    )
  }

}
