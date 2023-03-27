import { Component } from '@angular/core';
import { PasswordManagerService } from '../password-manager.service';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css'],
})
export class SiteListComponent {

  constructor(private passwordManager:PasswordManagerService){}
  onSubmit(values: object) {
    this.passwordManager.addSite(values).then(()=>{
      console.log('saved success')
    })
    .catch(err=>{
      console.log(err)
    })
  }
}
