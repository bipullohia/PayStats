import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from 'src/app/service/payment.service';
import { Payment } from 'src/app/model/payment';
import { ManageService } from 'src/app/service/manage.service';
import { PaymentEntity, PaymentCategory, PaymentMode } from 'src/app/model/manage';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css']
})
export class AddPaymentComponent implements OnInit {

  payment: Payment;
  paymentCopy: Payment;
  isEditing: boolean;
  addLogo: string;
  paymentEntities: PaymentEntity[];
  paymentCategories: PaymentCategory[];
  paymentModes: PaymentMode[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private paymentService: PaymentService,
    private manageService: ManageService,
    private router: Router
  ) {
    this.addLogo = "assets/images/add.png";
  }

  ngOnInit() {

    this.getAllPaymentCategory();
    this.getAllPaymentEntity();
    this.getAllPaymentModes();

    this.payment = new Payment();
    this.isEditing = false;
    this.loadExistingPayment();
    if(!this.isEditing){
      this.payment.dateOfTransaction = this.getCurrentDate();
    }
  }

  getAllPaymentEntity() {
    this.paymentEntities = [];
    this.manageService.getAllPaymentEntity().subscribe(
      (data) => {
        this.paymentEntities = data;
      }
    );
  }

  getAllPaymentCategory() {
    this.paymentCategories = [];
    this.manageService.getAllPaymentCategory().subscribe(
      (data) => {
        this.paymentCategories = data;
      }
    );
  }

  getAllPaymentModes() {
    this.paymentModes = [];
    this.manageService.getAllPaymentMode().subscribe(
      (data) => {
        this.paymentModes = data;
      }
    );
  }

  getCurrentDate(){
    let date = new Date();
    let day = (date.getDate()<10 ? "0"+date.getDate() : date.getDate());
    let month = (date.getMonth()<10 ? "0"+(date.getMonth()+1) : (date.getMonth()+1));
    let dateString = date.getFullYear() + "-" + month + "-" + day;
    return dateString;
  }

  loadExistingPayment() {
    this.activatedRoute.params.subscribe(
      (params) => {
        let pid = params['id'];
        if (pid) {
          this.paymentService.getPaymentById(pid).subscribe(
            (data) => {
              this.payment = data;
              this.isEditing = true;
            }
          );
        }
      }
    );
  }

  save() {
    this.payment.title = this.payment.title.charAt(0).toUpperCase() + this.payment.title.substr(1, this.payment.title.length);
    if (this.payment.description == null || this.payment.description == "") {
      this.payment.description = this.payment.title;
    }
    if (this.isEditing) {
      this.paymentService.updatePayment(this.payment).subscribe(
        (data) => {
          this.router.navigateByUrl("/listPayments/all");
          //this.NgxNotificationService.sendMessage("Successfully Updated!", "success", "bottom-right");
        },
        (error) => { alert("Some error occured while updating the payment"); }
      );

    } else {
      this.paymentService.addPayment(this.payment).subscribe(
        (data) => {
          this.router.navigateByUrl("/listPayments/all");
        },
        (error) => { alert("Some error occured while adding the payment"); }
      );
    }
  }

  doCancel() {
    this.router.navigateByUrl("/listPayments/all");
  }

  setDefaultValues() {
    this.loadExistingPayment();
  }

  resetValues() {
    this.payment = new Payment;
  }
}
