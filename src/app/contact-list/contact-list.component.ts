import { ContactsService } from './../Services/contacts.service';
import { Component } from '@angular/core';
import { UtilityService } from '../Services/utilityService/utilitiesService';
import { Observable, Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewContactComponent } from '../view-contact/view-contact.component';
import { AddContactComponent } from '../add-contact/add-contact.component';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent {
  constructor(
    private contactService:ContactsService,
    private _dialog: NgbModal,
    private Alertservice: UtilityService,
   ){}

  contactList$!: Observable<any>; 
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  
  ngOnInit(): void {
   
    console.log('rufhghgjgj')
    this.loadData()
      this.getContacts()
  }

  loadData(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 15,

    };
    this.dtTrigger.next("");
  }
 
getContacts(){
  this.Alertservice.ShowSpinner()
  this.contactList$ = this.contactService.getContacts()
  this.contactList$.subscribe((data)=>{    
    this.Alertservice.HideSpinner()
  })
}
openView(id:any){
  const dialogRef = this._dialog.open(ViewContactComponent, {
    scrollable: true,
    windowClass: 'myCustomModalClass2',
    size: 'xl',
    backdrop: 'static',
    keyboard: false,
    centered: true
  });

  dialogRef.componentInstance.contactId = id
  dialogRef.result.then((result) => {
    if (result == "succesful") {
     console.log("saved");
   }
   else{
   console.log("closed");
   }
 }, (reason) => {
 });
}

openAddContact(){const dialogRef = this._dialog.open(AddContactComponent, {
  scrollable: true,
  windowClass: 'myCustomModalClass2',
  size: 'xl',
  backdrop: 'static',
  keyboard: false,
  centered: true
});

dialogRef.result.then((result) => {
  if (result == "succesful") {
   console.log("saved");
 }
 else{
 console.log("closed");
 }
}, (reason) => {
});
}

deleteContact(id:string){
  this.Alertservice.ShowSpinner();
  this.contactService.delete(id).subscribe({
    next:v=>{
      console.log(v)
      this.Alertservice.HideSpinner();
       this.Alertservice.reloadComponent();
      this.Alertservice.alertSuccess("Contact Successfully Deleted.")
    },
    error:e=>{
     this.Alertservice.reloadComponent();
     this.Alertservice.alertError("An Error Occured, Pls try Again");
     this.Alertservice.HideSpinner()
 
   }
  })
}
}
