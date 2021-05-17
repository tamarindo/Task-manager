import { Injectable } from '@angular/core';
import {auth, User} from 'firebase/app'
import {AngularFireAuth} from '@angular/fire/auth'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user:User | undefined

  constructor( public afAuth: AngularFireAuth,
    public router : Router
    ) { 
    this.afAuth.authState.subscribe(user => {

      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.router.navigate([''])
      } else {
        localStorage.removeItem('user');
        this.router.navigate(['auth'])
      }
    })
  }
  
  async loginGoogle(){
    try{
      
      return this.afAuth.signInWithPopup( new auth.GoogleAuthProvider())
    }
    catch(error){
      console.log(error)
      return error
    }
  }
  logout(){
    return this.afAuth.signOut();
  }

  get isLoggedIn(){
    const internalUser = localStorage.getItem('user');
    if( internalUser !== null  ){
    const  user:any = internalUser;
      return ( user.emailVerified !== false) ? true : false;
    }
    else{
      return false
    }
    
  }
}
