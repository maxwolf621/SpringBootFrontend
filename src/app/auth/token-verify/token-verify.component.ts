import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { AuthService } from '../authservice/auth.service';


@Component({
  selector: 'app-token-verify',
  templateUrl: './token-verify.component.html',
  styleUrls: ['./token-verify.component.scss']
})
export class TokenVerifyComponent implements OnInit {

  token = "";

  constructor(private activateRoute: ActivatedRoute,
              private authService : AuthService,
              private toastr : ToastrService,
              private route : Router)
  { 

    this.token = this.activateRoute.snapshot.params.token;
    console.info("----token :" + this.token);
  }

  ngOnInit(): void {
    this.authService.verifyWithToken(this.token).subscribe(
      (result) =>{
        this.toastr.success("Token verified successfully");

      }, (error) =>{
        console.warn(error);
      }, () =>{
        console.info("ok");
      }
    )
    //this.route.navigateByUrl("/");
  }
}
