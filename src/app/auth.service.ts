import { Injectable } from '@angular/core';
import { Auth,signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn:BehaviorSubject<boolean> =  new BehaviorSubject<boolean>(false)
  isLoggedInGuard:boolean = false

  constructor(public auth:Auth, private router:Router, private toaster:ToastrService) {  }

  login(email:any,password:any){
  signInWithEmailAndPassword(this.auth,email,password).then(
      logRef=>{
        this.toaster.success('Logged In Successfully')
        this.router.navigate(['/site-list'])
        this.loggedIn.next(true)
        this.isLoggedInGuard = true
      }
    ).catch(e=>{

      this.toaster.warning("Email or Password Incorrect")
    })
  }

  logOut(){
    this.auth.signOut().then(()=>{
      this.router.navigate(['/login'])
      this.loggedIn.next(false)
      this.isLoggedInGuard = false
    })
  }

  isLoggedIn(){
    return this.loggedIn.asObservable()
  }
}
