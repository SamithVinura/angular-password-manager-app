import { Component,OnInit } from '@angular/core';
import { PasswordManagerService } from '../password-manager.service';
import {Observable} from 'rxjs'
@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css'],
})
export class SiteListComponent implements OnInit {

allSites!:Observable<Array<any>>
siteName !:string;
siteImgUrl !:string;
siteUrl !:string;
siteId !:string;
formStatus:string = "Add New"
isSuccess:boolean =false
successMsg!:string

  constructor(private passwordManagerService:PasswordManagerService){

    this.loadSites()
  }

  ngOnInit():void{}

  showAlert(message:string){
    this.isSuccess =true
    this.successMsg = message
  }


  onSubmit(values: object) {

    if(this.formStatus==='Add New'){
      this.passwordManagerService.addSite(values).then(()=>{
        this.showAlert('Site Added Successfully')
        setTimeout(()=>{
          this.isSuccess = false
        },1500)
      })
      .catch(err=>{
        console.log(err)
      })
    }else if(this.formStatus==='Edit'){
      this.passwordManagerService.updateSite(this.siteId,values).then(()=>{
        this.showAlert('Site Edited Successfully')
        setTimeout(()=>{
          this.isSuccess = false
        },1500)
      })
      .catch(err=>{
        console.log(err)
      })
    }

  }


  loadSites(){
    this.allSites = this.passwordManagerService.loadSites()
  }

  editSite(siteName:string,siteImgUrl:string,siteUrl:string,id:string){

    this.formStatus = 'Edit'
    this.siteName = siteName
    this.siteImgUrl = siteImgUrl
    this.siteUrl = siteUrl
    this.siteId = id

  }


  deleteSite(id:string){
    this.passwordManagerService.deleteSite(id).then(()=>{
      this.showAlert('Site Deleted Successfully')
      setTimeout(()=>{
        this.isSuccess = false
      },1500)
    })
    .catch(err=>{
      console.log(err)
    })
  }
}
