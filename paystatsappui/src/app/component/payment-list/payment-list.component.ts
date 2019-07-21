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
  editLogo: string;
  garbageLogo: string;
  detailLogo: string;
  gridViewLogo: string;
  listViewLogo: string;

  payments: Payment[];
  paymentEntities: PaymentEntity[];
  paymentCategories: PaymentCategory[];
  paymentModes: PaymentMode[];
  paymentSelected: Payment;
  indexSelected: number;

  //this is when no payment entity/cateogry/mode is selected in checkboxes 
  nullValueErrorBoolean: boolean = false;
  errorMsg: string;

  //to store all the possible types of filters
  allFilterTypeOptions: string[] = ["paymentDate", "paymentAmount",
    "paymentCategory", "paymentMode", "paymentEntity"];

  //to store all type of filters available at any given time
  currentFilterTypes: string[] = [];

  //to store all the filters which have been selected but may/maynot be applied yet
  filtersSelected: Filter[] = [];

  //to store the filters which have been applied in the result
  filtersApplied: Filter[] = [];

  //to store what type of filter is being dealt with currently
  filterTypeSelected: string;

  //to check if all the types of filters have already been selected
  allFiltersSelectedBoolean: boolean = false;

  //to check if the filter is being edited
  isEditingFilter: boolean = false;


  isGridView: boolean;
  sortingApplied: string;

  //these variables help to save default values in add/edit filter
  bsDateValue = new Date();
  bsDateRangeValue: Date[];
  currentDate = new Date();
  minAmountFilter: number;
  maxAmountFilter: number;

  modalRef: BsModalRef;
  detailsModalRef: BsModalRef;
  manageFiltersModalRef: BsModalRef;
  addEditFilterModalRef: BsModalRef;

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

  //change the view from grid to list and vice-versa
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

  //set all the available filter type values to 'currentFilterTypes'
  setAllValuesTocurrentFilterTypes() {
    for (let i = 0; i < this.allFilterTypeOptions.length; i++) {
      this.currentFilterTypes.push(this.allFilterTypeOptions[i]);
    }
  }

  //converts the 'filter type' like 'filter name' (eg., paymentDate to Payment Date)
  convertTypeToName(filterType: string): string {
    let filterName = filterType.replace(/([A-Z])/g, ' $1').trim();
    filterName = filterName[0].toUpperCase() + filterName.substring(1);
    return filterName;
  }

  //to get a given date in proper string format
  getDateString(date: Date): string {
    let day = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
    let month = (date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1));
    let dateString = day + "-" + month + "-" + date.getFullYear();
    return dateString;
  }

  unselectAllItemsInTheArray(array: any[]) {
    for (let item of array) {
      item.selected = false;
    }
  }

  setDefaultValuesForFilter() {
    this.bsDateValue.setDate(this.currentDate.getDate() - 7);
    this.bsDateRangeValue = [this.bsDateValue, this.currentDate];
    this.minAmountFilter = 0;
    this.maxAmountFilter = 500;
    this.unselectAllItemsInTheArray(this.paymentEntities);
    this.unselectAllItemsInTheArray(this.paymentCategories);
    this.unselectAllItemsInTheArray(this.paymentModes);
    this.filterTypeSelected = "";
    this.nullValueErrorBoolean = false;
    this.errorMsg = "";
    this.isEditingFilter = false;
  }

  closeManageFiltersModal() {
    this.manageFiltersModalRef.hide();
    this.filtersSelected = [];
  }

  closeAddEditFilterModal() {
    this.addEditFilterModalRef.hide();
    this.setDefaultValuesForFilter();
  }

  removeValueFromArray(value: string, array: string[]): string[] {
    for (let i = 0; i < array.length; i++) {
      if (array[i] == value) {
        array.splice(i, 1);
      }
    }
    return array;
  }

  viewManageFiltersModal(template: TemplateRef<any>) {
    this.filtersSelected = [];
    for (let filter of this.filtersApplied) {
      this.filtersSelected.push(filter);
    }
    this.checkIfAllFiltersSelected();
    this.manageFiltersModalRef = this.modalService.show(template, { class: 'modal-lg', ignoreBackdropClick: true });
  }

  viewAddEditFilter(template: TemplateRef<any>, index: number) {

    this.populateCurrentFilterTypeArray();
    this.setDefaultValuesForFilter();
    if (index != null) {
      this.isEditingFilter = true;
      this.filterTypeSelected = this.filtersSelected[index].filterType;

      if (this.filterTypeSelected == "paymentCategory") {
        for (let value of this.filtersSelected[index].filterValues) {
          for (let category of this.paymentCategories) {
            if (value == category.categoryName)
              category.selected = true;
          }
        }
      }

      if (this.filterTypeSelected == "paymentEntity") {
        for (let value of this.filtersSelected[index].filterValues) {
          for (let entity of this.paymentEntities) {
            if (value == entity.entityName)
              entity.selected = true;
          }
        }
      }

      if (this.filterTypeSelected == "paymentMode") {
        for (let value of this.filtersSelected[index].filterValues) {
          for (let mode of this.paymentModes) {
            if (value == mode.paymodeName)
              mode.selected = true;
          }
        }
      }
    }
    this.addEditFilterModalRef = this.modalService.show(template, { class: 'modal-lg', ignoreBackdropClick: true });
  }

  removeFilter(index: number) {
    this.currentFilterTypes.push(this.filtersSelected[index].filterType);
    this.filtersSelected.splice(index, 1);
    this.allFiltersSelectedBoolean = false;
  }

  //to populate the filter options in currentFilterTypes array (and remove the ones already selected)
  populateCurrentFilterTypeArray() {
    this.currentFilterTypes = [];
    this.setAllValuesTocurrentFilterTypes();
    if (this.filtersSelected.length != 0) {
      for (let i = 0; i < this.filtersSelected.length; i++) {
        this.currentFilterTypes = this.removeValueFromArray(this.filtersSelected[i].filterType, this.currentFilterTypes);
      }
    }
  }

  checkIfAllFiltersSelected() {
    if (this.filtersSelected.length == this.allFilterTypeOptions.length) {
      this.allFiltersSelectedBoolean = true;
    } else {
      this.allFiltersSelectedBoolean = false;
    }
  }

  resetFilters() {
    this.filtersSelected = [];
    for (let filter of this.filtersApplied) {
      this.filtersSelected.push(filter);
    }
    this.populateCurrentFilterTypeArray();
    this.checkIfAllFiltersSelected();
  }

  applyFilters() {
    if (this.filtersApplied.length == 0) {
      this.filtersApplied = this.filtersSelected;
    } else {
      this.filtersApplied = [];
      for (let filter of this.filtersSelected) {
        this.filtersApplied.push(filter);
      }
    }
    let payment: Payment[];
    payment = this.paymentService.getFilteredPayments(this.filtersApplied);
    console.log(payment.length + " : length of payment");
    
    this.closeManageFiltersModal();
  }

  addFilter(filterType: string, filterValue: string[]) {
    let filter = new Filter();
    let filterValueArray: string[] = [];

    if (this.isEditingFilter) {
      for (let i = 0; i < this.filtersSelected.length; i++) {
        if (filterType == this.filtersSelected[i].filterType) {
          this.filtersSelected.splice(i, 1);
        }
      }
    }

    switch (filterType) {
      case "paymentDate":
        filterValueArray.push(this.getDateString(this.bsDateRangeValue[0]));
        filterValueArray.push(this.getDateString(this.bsDateRangeValue[1]));
        break;
      case "paymentAmount":
        filterValueArray.push(this.minAmountFilter.toString());
        filterValueArray.push(this.maxAmountFilter.toString());
        break;
      case "paymentCategory":
        for (let category of this.paymentCategories) {
          if (category.selected)
            filterValueArray.push(category.categoryName);
        }
        break;
      case "paymentMode":
        for (let mode of this.paymentModes) {
          if (mode.selected)
            filterValueArray.push(mode.paymodeName);
        }
        break;
      case "paymentEntity":
        for (let entity of this.paymentEntities) {
          if (entity.selected)
            filterValueArray.push(entity.entityName);
        }
        break;
    }

    if (filterValueArray.length == 0) {
      this.nullValueErrorBoolean = true;
      this.errorMsg = "Error! Select atleast one " + this.convertTypeToName(this.filterTypeSelected);
    } else {
      filter.filterType = filterType;
      filter.filterName = this.convertTypeToName(filterType);
      filter.filterValues = filterValueArray;

      // to remove the selected filter from filter options
      for (let i = 0; i < this.currentFilterTypes.length; i++) {
        if (this.currentFilterTypes[i] == filterType) {
          this.currentFilterTypes.splice(i, 1);
          break;
        }
      }

      this.filtersSelected.push(filter);
      this.checkIfAllFiltersSelected();
      this.closeAddEditFilterModal();
    }
  }
}