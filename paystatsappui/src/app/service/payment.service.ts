import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Payment } from '../model/payment';
import { Filter } from '../model/manage';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  baseUrl : string;

  constructor(
    private http : Http,
    private httpClient: HttpClient
    ) {
    this.baseUrl = "http://localhost:7777/payments";
   }

   getBaseUrlById(id:number): string{
     return this.baseUrl + "/" + id;
   }

   getSearchUrl(field:string, value:string):string{
     return this.baseUrl + "/" + field + "/" + value; 
   }

   getJsonContentTypeHeader(): RequestOptions{
     const headers = new Headers();
     headers.append('Content-Type', 'application/json');
     return new RequestOptions({headers: headers});
   }

   getAllPayments(): Observable<Payment[]>{
     return this.http.get(this.baseUrl+"/all").pipe(
       map(data => data.json())
     );
   }

   searchPayments(field:string, value:string): Observable<Payment[]>{
     return this.http.get(this.getSearchUrl(field, value)).pipe(
       map(data => data.json())
     );
   }

   getPaymentById(id:number):Observable<Payment>{
     return this.http.get(this.getBaseUrlById(id)).pipe(
       map(data => data.json())
     );
   }

   deletePaymentById(id:number): Observable<Response>{
     console.log(id);
     return this.http.delete(this.getBaseUrlById(id));
   }

   addPayment(payment: Payment):Observable<Payment>{
     return this.http.post(this.baseUrl, JSON.stringify(payment),
      this.getJsonContentTypeHeader()).pipe(
        map(data => data.json())
      );
   }

   updatePayment(payment: Payment): Observable<Payment>{
     return this.http.put(this.baseUrl, JSON.stringify(payment),
     this.getJsonContentTypeHeader()).pipe(
       map(data => data.json())
     );
   }

   getFilteredPayments(filters: Filter[]): Payment[]{
    let filteredPayment: Payment[] = [];
    this.httpClient.post(this.baseUrl+"/filters", filters).subscribe((payments: Payment[])=> {
      payments.forEach(p => filteredPayment.push(p));
    });
    return filteredPayment;
   }
   
}
