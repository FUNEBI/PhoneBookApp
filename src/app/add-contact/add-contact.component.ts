import { Component } from '@angular/core';
import { UtilityService } from '../Services/utilityService/utilitiesService';
import { ContactsService } from '../Services/contacts.service';
import {FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent {

  formGroup!: FormGroup;

  constructor(
    private fb:FormBuilder,
    private ContactsService:ContactsService,
    private alertService: UtilityService,
   ){}

   ngOnInit(): void {
    this.initForm()
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
  onSubmit(){
    let formData = new FormData();
    let data = {
      employee_name:this.f['firstname'].value,
      employee_salary:this.f['phoneNumber'].value,
    }
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value)
    }
    this.ContactsService.createContact(data).subscribe((data:any)=>{
      this.alertService.ShowSpinner()
      this.alertService.reloadComponent();
      this.alertService.alertSuccess("Contact Successfully Creayed");
      this.alertService.HideSpinner();
    } ,(err:any)=>{
      console.log(err)
      this.alertService.HideSpinner();
      this.alertService.alertError(err)
    }
    
    
 ) }
}
