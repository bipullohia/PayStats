import { Component, OnInit, TemplateRef } from '@angular/core';
import { PaymentService } from 'src/app/service/payment.service';
import { Payment } from 'src/app/model/payment';
import { NgxNotificationService } from 'ngx-notification';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PaymentEntity, PaymentMode, PaymentCategory, Filter } from 'src/app/model/manage';
import { ManageService } from 'src/app/service/manage.service';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {

  payments: Payment[];
  paymentEntities: PaymentEntity[];
  paymentCategories: PaymentCategory[];
  paymentModes: PaymentMode[];

  isPresent: boolean = true;
  // filter: Filter;

  paymentSelected: Payment;
  indexSelected: number;

  editLogo: string;
  garbageLogo: string;
  detailLogo: string;
  gridViewLogo: string;
  listViewLogo: string;

  filtersSelected: Filter[] = [];
  filtersApplied: Filter[] = [];

  sortingApplied: string;
  filterTypeString: string;
  filterNameString: string;

  modalRef: BsModalRef;
  detailsModalRef: BsModalRef;
  filtersModalRef: BsModalRef;
  addEditFilterModalRef: BsModalRef;

  isGridView: boolean;
  constructor(private paymentService: PaymentService,
    private manageService: ManageService,
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
    this.getAllPaymentCategory();
    this.getAllPaymentEntity();
    this.getAllPaymentModes();
  }

  changeView(viewType: string) {
    if (viewType == "list") {
      this.isGridView = false;
    } else {
      this.isGridView = true;
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
        this.sortArray("mostRecentPaymentFirst");
        console.log(this.payments.length + "--");
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

  viewManageFiltersModal(template: TemplateRef<any>) {
    this.filterTypeString = "";
    //this.filtersSelected = this.filtersApplied;
    for(let filter of this.filtersApplied){
      this.filtersSelected.push(filter);
    }

    this.filtersModalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  viewAddEditFilter(template: TemplateRef<any>){
    this.addEditFilterModalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  removeFilter(filter: Filter) {
    console.log(filter + "(((");
    let i=0;
    for(let filter of this.filtersSelected){
      if(filter == filter){
        console.log("**" + filter.filterType);
        this.filtersSelected.splice(i,1);
      }
      i++;
    }
  }

  addFilter(filterType: string, filterValue: string[]) {
    let filter = new Filter();
    let filterValueArray: string[] = [];

    switch (filterType) {
      case "paymentDate":
        filterValueArray.push("25/01/2019");
        filterValueArray.push("31/03/2019");
        break;
      case "paymentAmount":
        filterValueArray.push("10");
        filterValueArray.push("500");
        break;
      case "paymentCategory":
        for(let category of this.paymentCategories){
          if(category.selected)
            filterValueArray.push(category.categoryName);
        }
        break;
      case "paymentMode":
          for(let mode of this.paymentModes){
            if(mode.selected)
              filterValueArray.push(mode.paymodeName);
          }
        break;
      case "paymentEntity":
          for(let entity of this.paymentEntities){
            if(entity.selected)
              filterValueArray.push(entity.entityName);
          }
        break;
    }

    filter.filterType = filterType;
    filter.filterName = this.convertTypeToName(filterType);
    filter.filterValues = filterValueArray;
    this.filtersSelected.push(filter);

    this.filterTypeString = "";
    this.filterNameString = "";

    this.addEditFilterModalRef.hide();
  }

  convertTypeToName(filterType: string): string {
    let filterName = filterType.replace(/([A-Z])/g, ' $1').trim();
    filterName = filterName[0].toUpperCase() + filterName.substring(1);
    return filterName;
  }

  resetFilters() {
    this.filtersSelected = [];
    this.unselectAllItemsInTheArray(this.paymentEntities);
    this.unselectAllItemsInTheArray(this.paymentCategories);
    this.unselectAllItemsInTheArray(this.paymentModes);
    this.filterTypeString = "";
    this.filterNameString = "";
  }

  closeFilterModal(){
    this.filtersSelected = [];
    this.unselectAllItemsInTheArray(this.paymentEntities);
    this.unselectAllItemsInTheArray(this.paymentCategories);
    this.unselectAllItemsInTheArray(this.paymentModes);
    this.filterTypeString = "";
    this.filterNameString = "";
    this.filtersModalRef.hide();
  }

  applyFilters(){
    if(this.filtersApplied.length==0){
      this.filtersApplied = this.filtersSelected;
    }else{
      for(let filter of this.filtersSelected){
        this.filtersApplied.push(filter);
      }
    }
    this.closeFilterModal();
  }

  unselectAllItemsInTheArray(array: any[]){
    for(let item of array){
      item.selected = false;
    }
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