import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from 'src/app/service/payment.service';
import { Payment } from 'src/app/model/payment';

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private paymentService: PaymentService,
    private router: Router
  ) {
    this.addLogo = "assets/images/add.png";
  }

  ngOnInit() {
    this.payment = new Payment();
    this.isEditing = false;

    this.loadExistingPayment();
    
  }

  loadExistingPayment(){
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
    // console.log("Save pressed. Title: "+ this.payment.title);
    // console.log("Save pressed. Paytype: "+ this.payment.payType);
    // console.log(this.payment.title + "1");
    this.payment.title = this.payment.title.charAt(0).toUpperCase() + this.payment.title.substr(1, this.payment.title.length);
    if(this.payment.description == null || this.payment.description == ""){
      this.payment.description = this.payment.title;
    }
    //console.log(this.payment.title + "2");
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

  setDefaultValues(){
    this.loadExistingPayment();
  }

  resetValues(){
    this.payment = new Payment;
  }
}
