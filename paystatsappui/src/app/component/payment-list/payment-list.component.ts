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

  sortingApplied: string;

  modalRef: BsModalRef;
  detailsModalRef: BsModalRef;
  filtersModalRef: BsModalRef;

  isGridView: boolean;
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
    this.isGridView = false;
    this.getAllPayments();
    this.sortArray("mostRecentPaymentFirst");
    //this.payments.
  }

  changeView(viewType: string) {
    if (viewType == "list") {
      this.isGridView = false;
    } else {
      this.isGridView = true;
    }
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


  getAllPayments() {
    this.paymentService.getAllPayments().subscribe(
      (data) => {
        this.payments = data;
      }
    );
  }

  sortArray(sortType: string) {

    switch (sortType) {

      case "mostRecentPaymentFirst":
        this.sortingApplied = "Most Recent Payment First";
        this.payments = this.payments.sort((n1, n2) => new Date(n2.dateOfTransaction).getTime() - new Date(n1.dateOfTransaction).getTime());
        break;

      case "oldestPaymentFirst":
        this.sortingApplied = "Oldest Payment First";
        this.payments = this.payments.sort((n1, n2) => new Date(n1.dateOfTransaction).getTime() - new Date(n2.dateOfTransaction).getTime());
        break;

      case "paymentAmountLowToHigh":
        this.sortingApplied = "Payment Amount: Low to High";
        this.payments = this.payments.sort((n1, n2) => n1.amount - n2.amount);
        break;

      case "paymentAmountHighToLow":
        this.sortingApplied = "Payment Amount: High to Low";
        this.payments = this.payments.sort((n1, n2) => n2.amount - n1.amount);
        break;

      case "recentlyAddedPayment":
        this.sortingApplied = "Recently Added Payment";
        this.payments = this.payments.sort((n1, n2) => new Date(n2.timestamp).getTime() - new Date(n1.timestamp).getTime());
        break;

      default: console.log("default");
    }
  }

  deleteModal(template: TemplateRef<any>, payment: Payment, index: number) {
    this.modalRef = this.modalService.show(template);
    this.paymentSelected = payment;
    this.indexSelected = index;
  }

  viewDetails(template: TemplateRef<any>, payment: Payment, index: number) {
    this.detailsModalRef = this.modalService.show(template);
    this.paymentSelected = payment;
    this.indexSelected = index;
  }

  applyFilters(template: TemplateRef<any>) {
    this.filtersModalRef = this.modalService.show(template);
  }

  deletePayment() {
    this.paymentService.deletePaymentById(this.paymentSelected.payid).subscribe(
      (resp) => {
        if (resp.ok) {
          this.payments.splice(this.indexSelected, 1);
          this.ngxNotificationService.sendMessage('Payment Record successfully deleted!', 'success', 'bottom-right');
        } else {
          this.ngxNotificationService.sendMessage('Payment Record deletion failed!', 'danger', 'bottom-right')
        }
      }
    );
  }
}