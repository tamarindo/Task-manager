import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isLoggedIn:boolean= false; 
  public userCurrency: Observable<any> = this.authSvc.afAuth.user;
  constructor(
    public authSvc: AuthService, private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authSvc.isLoggedIn;
  }
  async logout(){
    
    try {
      await this.authSvc.logout();
      this.isLoggedIn = false
      localStorage.removeItem('user');
    }catch (error) {
      console.log(error);
    }
  }
}
