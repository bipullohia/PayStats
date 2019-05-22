import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { PaymentListComponent } from './component/payment-list/payment-list.component';
import { AddPaymentComponent } from './component/add-payment/add-payment.component';

import { NgxNotificationComponent } from 'ngx-notification';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AdjustLengthPipe } from './pipe/adjust-length.pipe';
import { ManageComponent } from './component/manage/manage.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'listPayments/all', component: PaymentListComponent},
  {path: 'listPayments/:category', component: PaymentListComponent},
  {path:'addPayment',component:AddPaymentComponent},
  {path:'manage/:option',component:ManageComponent},  
  {path:'editPayment/:id',component:AddPaymentComponent},
  {path:'deletePayment/:id',component:HomeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PaymentListComponent,
    AddPaymentComponent,
    NgxNotificationComponent,
    AdjustLengthPipe,
    ManageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
