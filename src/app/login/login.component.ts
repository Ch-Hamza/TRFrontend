import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { AuthLoginInfo } from '../auth/login-info';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;
 
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }
 
  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
    if(this.isLoggedIn /*&& this.roles[0] == "ROLE_ADMIN"*/) {
      //console.log(this.roles)
      this.router.navigate(['game']);
    } /*else if(this.isLoggedIn) {
      //console.log(this.roles)
      this.router.navigate(['screen']);
    }*/
  }
 
  onSubmit() {
    this.loginInfo = new AuthLoginInfo(
      this.form.username,
      this.form.password);

      console.log(this.loginInfo);
 
    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);
 
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();
        this.reloadPage();
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }
 
  reloadPage() {
    window.location.reload();
  }
}