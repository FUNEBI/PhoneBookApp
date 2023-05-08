
import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';
import { Observable, Subject } from 'rxjs';

type Contact = Array<{firstName:string,lastName:string}>


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  contactList:[]=[]
  formGroup!: FormGroup;
  firstName:string="";
  lastName:any;
  

  contactList$!: Observable<any>; 
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  

  



  
}
