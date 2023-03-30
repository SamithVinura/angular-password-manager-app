import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { PasswordManagerService } from '../password-manager.service';
import { AES,enc } from 'crypto-js';


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

  passwordList!:Array<any>

  email!:string;
  username!:string;
  password!:string;
  passwordId!:string

  formStatus:string = 'Add New'

  isSuccess:boolean =false
  successMsg!:string


  constructor(private route:ActivatedRoute,private passwordManagerService:PasswordManagerService){
    this.route.queryParams.subscribe((val:any)=>{
      this.siteId = val.id
      this.siteName = val.siteName
      this.siteUrl = val.siteUrl
      this.siteimgUrl = val.siteimgUrl

    })

    this.loadPasswords()

  }

  showAlert(message:string){
    this.isSuccess =true
    this.successMsg = message
  }

  onSubmit(values:any){

    const encryptedPassword = this.encryptPassword(values.password)
    values.password = encryptedPassword
    if(this.formStatus ==="Add New"){
      this.passwordManagerService.addPassword(values,this.siteId).then(()=>{
        this.showAlert('Password Added Successfully')
        setTimeout(()=>{
          this.isSuccess = false
        },1500)
      }).catch(err=>{
        console.log(err)
      })
    }else{
      this.passwordManagerService.updatePassword(this.siteId,this.passwordId,values).then(()=>{
        this.showAlert('Password Edited Successfully')
        setTimeout(()=>{
          this.isSuccess = false
        },1500)
        this.resetForm()
      }).catch(err=>{
        console.log(err)
      })
    }

  }

  loadPasswords(){
   this.passwordManagerService.loadPasswords(this.siteId).subscribe((val:any) => {
    this.passwordList = val
   })
  }

  editPassword(email:string,username:string,password:string,passwordId:string){
    this.email = email;
    this.username =username
    this.password =password
    this.passwordId =passwordId

    this.formStatus = 'Edit'
  }

  deletePassword(passwordId:string){
    this.passwordManagerService.deletepassword(this.siteId,passwordId).then(()=>{
      this.showAlert('Password Deleted Successfully')
      setTimeout(()=>{
        this.isSuccess = false
      },1500)
    }).catch(err=>{
      console.log(err)
    })
  }

  resetForm(){
    this.email = ''
    this.username =''
    this.password =''
    this.passwordId =''

    this.formStatus='Add New'
  }

  encryptPassword(password:string){
    const secretKey = 'eSgVkYp3s6v9y$B&E)H@McQfTjWmZq4t'
    const encryptedPassword =   AES.encrypt(password,secretKey).toString()
    return encryptedPassword
  }

  decryptPassword(password:string){
    const secretKey = 'eSgVkYp3s6v9y$B&E)H@McQfTjWmZq4t'
    const decryptPassword = AES.decrypt(password,secretKey).toString(enc.Utf8)
    return decryptPassword
  }

  onDecrypt(password:string,index:number){
    const dePassword = this.decryptPassword(password)
    this.passwordList[index].password = dePassword
  }
}
