import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot,Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardlogin implements CanActivate {
  constructor(
    public authService:AuthService,
    public router : Router
  ){}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(this.authService.isLoggedIn !== true) {
      this.router.navigate(['auth'])
      return false;
    }else{
      return true;
    }

  }
  
}
