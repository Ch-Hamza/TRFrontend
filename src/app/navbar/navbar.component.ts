import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  authority: any;

  constructor(private router: Router, private token: TokenStorageService) { }

  ngOnInit() {
    this.authority = this.token.getAuthorities()[0];
    console.log(this.authority);
  }

  logout() {
    this.token.signOut();
    this.router.navigate(['auth/login']);
  }

}
