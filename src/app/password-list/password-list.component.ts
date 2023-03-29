import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { PasswordManagerService } from '../password-manager.service';

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.css']
})
export class PasswordListComponent {

  siteId!:string;
  siteName!:string;
  siteUrl!:string;
  siteimgUrl!:string

  passwordList!:Observable<Array<any>>

  email!:string;
  username!:string;
  password!:string;
  passwordId!:string

  formStatus:string = 'Add New'

  constructor(private route:ActivatedRoute,private passwordManagerService:PasswordManagerService){
    this.route.queryParams.subscribe((val:any)=>{
      this.siteId = val.id
      this.siteName = val.siteName
      this.siteUrl = val.siteUrl
      this.siteimgUrl = val.siteimgUrl

    })

    this.loadPasswords()

  }

  onSubmit(values:object){

    if(this.formStatus ==="Add New"){
      this.passwordManagerService.addPassword(values,this.siteId).then(()=>{
        console.log("Password save successfully")
      }).catch(err=>{
        console.log(err)
      })
    }else{
      this.passwordManagerService.updatePassword(this.siteId,this.passwordId,values).then(()=>{
        console.log("Password save successfully")
      }).catch(err=>{
        console.log(err)
      })
    }

  }

  loadPasswords(){
   this.passwordList = this.passwordManagerService.loadPasswords(this.siteId)
  }

  editPassword(email:string,username:string,password:string,passwordId:string){
    this.email = email;
    this.username =username
    this.password =password
    this.passwordId =passwordId

    this.formStatus = 'Edit'
  }

}
