import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isError:boolean=true

  constructor(private auth:AuthService,private router:Router){}

  onSubmit(values:any){
    this.auth.login(values.email,values.password)
    this.auth.loggedIn.asObservable().subscribe((val)=>{
      this.isError = val
    })
  }

}
