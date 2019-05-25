import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { PaymentEntity, PaymentCategory, PaymentMode } from '../model/manage';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManageService {
  baseUrl: string;
  paymentEntityUrl: string;
  paymentCategoryUrl: string;
  paymentModeUrl: string;

  constructor(private http: Http) {
    this.baseUrl = "http://localhost:7777/manage";
    this.paymentEntityUrl = this.baseUrl+"/paymentEntity";
    this.paymentCategoryUrl = this.baseUrl+"/paymentCategory";
    this.paymentModeUrl = this.baseUrl+"/paymentMode";
  }

  getJsonContentTypeHeader(): RequestOptions {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return new RequestOptions({ headers: headers });
  }


  getAllPaymentEntity(): Observable<PaymentEntity[]>{
    return this.http.get(this.paymentEntityUrl + "/all").pipe(
      map(data => data.json())
    );
  }

  getAllPaymentCategory(): Observable<PaymentCategory[]>{
    return this.http.get(this.paymentCategoryUrl + "/all").pipe(
      map(data => data.json())
    );
  }

  getAllPaymentMode(): Observable<PaymentMode[]>{
    return this.http.get(this.paymentModeUrl + "/all").pipe(
      map(data => data.json())
    );
  }


  addPaymentEntity(paymentEntity: PaymentEntity): Observable<PaymentEntity>{
    return this.http.post(this.paymentEntityUrl, JSON.stringify(paymentEntity),
      this.getJsonContentTypeHeader()).pipe(
        map(data => data.json())
    );
  }

  addPaymentCategory(paymentCategory: PaymentCategory): Observable<PaymentCategory>{
    return this.http.post(this.paymentCategoryUrl, JSON.stringify(paymentCategory),
      this.getJsonContentTypeHeader()).pipe(
        map(data => data.json())
    );
  }

  addPaymentMode(paymentMode: PaymentMode): Observable<PaymentMode>{
    return this.http.post(this.paymentModeUrl, JSON.stringify(paymentMode),
      this.getJsonContentTypeHeader()).pipe(
        map(data => data.json())
    );
  }


  updatePaymentEntity(paymentEntity: PaymentEntity): Observable<PaymentEntity>{
    return this.http.put(this.paymentEntityUrl, JSON.stringify(paymentEntity),
      this.getJsonContentTypeHeader()).pipe(
        map(data => data.json())
    );
  }

  updatePaymentCategory(paymentCategory: PaymentCategory): Observable<PaymentCategory>{
    return this.http.put(this.paymentCategoryUrl, JSON.stringify(paymentCategory),
      this.getJsonContentTypeHeader()).pipe(
        map(data => data.json())
    );
  }

  updatePaymentMode(paymentMode: PaymentMode): Observable<PaymentMode>{
    return this.http.put(this.paymentModeUrl, JSON.stringify(paymentMode),
      this.getJsonContentTypeHeader()).pipe(
        map(data => data.json())
    );
  }


  deletePaymentEntityById(id:number): Observable<Response>{
    return this.http.delete(this.paymentEntityUrl+"/"+id);
  }

  deletePaymentCategoryById(id:number): Observable<Response>{
    return this.http.delete(this.paymentCategoryUrl+"/"+id);
  }

  deletePaymentModeById(id:number): Observable<Response>{
    return this.http.delete(this.paymentModeUrl+"/"+id);
  }
  
}
