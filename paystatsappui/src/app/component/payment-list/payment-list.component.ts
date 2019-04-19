import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from 'src/app/service/payment.service';
import { Payment } from 'src/app/model/payment';
import { NgxNotificationService } from 'ngx-notification';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {

  payments: Payment[];
  paymentSelected: Payment;
  indexSelected: number;

  editLogo: string;
  garbageLogo: string;
  detailLogo: string;
  gridViewLogo: string;
listViewLogo: string;

  modalRef: BsModalRef;
  detailsModalRef: BsModalRef;

  constructor(private paymentService: PaymentService,
    private activatedRoute: ActivatedRoute,
    private modalService: BsModalService,
    private ngxNotificationService: NgxNotificationService
  ) {
    this.editLogo = "assets/images/pencil3.png";
    this.garbageLogo = "assets/images/garbage5.png";
    this.detailLogo = "assets/images/detail.png";
    this.gridViewLogo = "assets/images/grid-view.png";
    this.listViewLogo = "assets/images/list-view.png";
  }


  ngOnInit() {
    this.getAllPayments();
  }
    


    //this.isEditing = false;

    // this.activatedRoute.params.subscribe(
    //   (params) => {
    //     let category = params['category'];
    //     if (category) {
    //       console.log("Category Tasks available");
    //       this.paymentService.searchTasks("taskCategory", category).subscribe(
    //         (data) => {
    //           this.tasks = data;
    //           //console.log(this.tasks + "activated");
    //           this.isEditing = true;
    //         }
    //       );
    //     } else {
    //       console.log("All Tasks");
    //       this.taskService.getAllTasks().subscribe(
    //         (data) => {
    //           this.tasks = data;
    //           //console.log(this.tasks + "all tasks");
    //         }
    //       );
    //     }
    //   }
    // );
  

  getAllPayments(){
    this.paymentService.getAllPayments().subscribe(
      (data) => {
        this.payments = data;
      }
    );
  }

  deleteModal(template: TemplateRef<any>, payment: Payment, index:number) {
    this.modalRef = this.modalService.show(template);
    this.paymentSelected = payment;
    this.indexSelected = index;
  }

  viewDetails(template: TemplateRef<any>, payment: Payment, index:number){
    this.detailsModalRef = this.modalService.show(template);
    this.paymentSelected = payment;
    this.indexSelected = index;
  }

  deletePayment(){
    this.paymentService.deletePaymentById(this.paymentSelected.payid).subscribe(
      (resp) => {
        if(resp.ok){
          this.payments.splice(this.indexSelected, 1);
          this.ngxNotificationService.sendMessage('Payment Record successfully deleted!', 'success', 'bottom-right');
        }else{
          this.ngxNotificationService.sendMessage('Payment Record deletion failed!', 'danger', 'bottom-right')
        }
      }
    );
  }
}