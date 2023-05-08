import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactsService } from '../Services/contacts.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit {

  @Input() contactId: any;
  formGroup!: FormGroup;

  constructor(
    private fb:FormBuilder,
    public activeModal: NgbActiveModal,
    private ContactsService:ContactsService
  ){}

  ngOnInit(): void {
    console.log(this.contactId)
    this.initForm()
    // this.getContactById(this.contactId)
  }

  get f() {
    return this.formGroup.controls;
  }

  initForm() {
    this.formGroup = this.fb.group({
      ContactName: [
        { value: '', disabled: true },
       Validators.compose([
         Validators.required,
        ])
      ],
      phoneNumber: [
        { value: '', disabled: true },
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
  
  closeModal(sendData:any){
    this.activeModal.close(sendData);
  }
}
