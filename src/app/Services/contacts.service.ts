import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(
    private http: HttpClient
  ) { }

  public getContacts(): Observable<any> {
    const url = 'https://dummy.restapiexample.com/api/v1/employees'
    return this.http.get<any>(url);
  }
  public getContact(id: any): Observable<any> {
    const url = `https://dummy.restapiexample.com/api/v1/employee/${id}`
    return this.http.get<any>(url);
  }
  public updateContact(id: any,data:any): Observable<any> {
     const url = `https://dummy.restapiexample.com/api/v1/employee/${id}`
     return this.http.put<any>(url,data);
  }
  public delete(id: any) { 
    const url = `https://dummy.restapiexample.com/api/v1/delete/${id}/`
    return this.http.delete(url); 
    } 

    public createContact(data: any) { 
      const url = 'https://dummy.restapiexample.com/api/v1/create'
      return this.http.post(url,data); 
      } 
}
