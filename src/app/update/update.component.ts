import { Component } from '@angular/core';
import { UtilityService } from '../Services/utilityService/utilitiesService';
import { ActivatedRoute } from "@angular/router";
import { ContactsService } from '../Services/contacts.service';
import {FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {

  contactId:any;
  formGroup!: FormGroup;

  constructor(
    private fb:FormBuilder,
    private ContactsService:ContactsService,
    private activeRoute: ActivatedRoute,
    private alertService: UtilityService,
   ){}

   ngOnInit(): void {
    const id = 'id'
    this.contactId = this.activeRoute.snapshot.params[id];
    console.log(this.contactId)
    this.initForm()
    this.getContactById(this.contactId)
   }
   get f() {
    return this.formGroup.controls;
  }

  initForm() {
    this.formGroup = this.fb.group ({
      firstname: [
        '',
       Validators.compose([
         Validators.required,
        ])
      ],
      phoneNumber:[
        '',
       Validators.compose([
         Validators.required,
        ])
      ],

    })
  }

  getContactById(id:any){
    this.ContactsService.getContact(id).subscribe((data:any)=>{
      if(data){
        Object.keys(this.formGroup.controls).forEach(ctrl=>{
          this.formGroup.controls[ctrl].clearValidators();
        })
        this.formGroup.patchValue({
          ContactName:data.data.employee_name,
          phoneNumber:data.data.employee_salary
        })
      }
    })
  }

  onSubmit(){
    let formData = new FormData();
    let data = {
      employee_name:this.f['firstname'].value,
      employee_salary:this.f['phoneNumber'].value,
    }
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value)
    }
    this.ContactsService.updateContact(this.contactId,data).subscribe((data:any)=>{
      this.alertService.ShowSpinner()
      this.alertService.reloadComponent();
      this.alertService.alertSuccess("Contact Successfully Updated");
      this.alertService.HideSpinner();
    } ,(err:any)=>{
      console.log(err)
      this.alertService.HideSpinner();
      this.alertService.alertError(err)
    }
    
    
 ) }

}
