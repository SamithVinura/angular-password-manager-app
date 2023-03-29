import { Injectable } from '@angular/core';
import { Firestore, addDoc,doc,updateDoc,deleteDoc,collectionData } from '@angular/fire/firestore';
import { collection, } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class PasswordManagerService {


  constructor(private firestore:Firestore) { }

  addSite(data:object){
    const dbInstance = collection(this.firestore,'sites')

    return addDoc(dbInstance,data)
  }

  loadSites(){
    const dbInstance = collection(this.firestore,'sites')
    return collectionData(dbInstance,{idField:'id'})
  }

  updateSite(id:string,data:object){
    const docInstance = doc(this.firestore,'sites',id)
    return updateDoc(docInstance,data)
  }

  deleteSite(id:string){
    const docInstance = doc(this.firestore,'sites',id)
    return deleteDoc(docInstance)

  }

  addPassword(data:object,id:string){
    const dbInstance = collection(this.firestore,`sites/${id}/passwords`)
    return addDoc(dbInstance,data)
  }

  loadPasswords(siteId:string){
    const dbInstance = collection(this.firestore,`sites/${siteId}/passwords`)
    return collectionData(dbInstance,{idField:'id'})
  }

  updatePassword(siteId:string,passwordId:string,data:object){
    const docInstance = doc(this.firestore,`sites/${siteId}/passwords`,passwordId)
    return updateDoc(docInstance,data)
  }

  deletepassword(siteId:string,passwordId:string){
    const docInstance = doc(this.firestore,`sites/${siteId}/passwords`,passwordId)
    return deleteDoc(docInstance)

  }


}
