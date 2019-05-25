import { Component, OnInit, TemplateRef } from '@angular/core';
import { PaymentCategory } from 'src/app/model/manage';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ManageService } from 'src/app/service/manage.service';
import { NgxNotificationService } from 'ngx-notification';

@Component({
  selector: 'app-payment-category',
  templateUrl: './payment-category.component.html',
  styleUrls: ['./payment-category.component.css']
})
export class PaymentCategoryComponent implements OnInit {

  editLogo: string;
  garbageLogo: string;
  paymentCategories: PaymentCategory[];
  categorySelected: PaymentCategory;
  selectedCategoryName: string;
  indexSelected: number;
  isEditing: boolean;
  duplicateCategorySelected: PaymentCategory;

  addModalRef: BsModalRef;
  deleteModalRef: BsModalRef;

  constructor(
    private manageService: ManageService,
    private modalService: BsModalService,
    private ngxNotificationService: NgxNotificationService
  ) {
    this.editLogo = "assets/images/pencil3.png";
    this.garbageLogo = "assets/images/garbage5.png";
  }

  ngOnInit() {
    this.getAllPaymentCategory();
  }

  getAllPaymentCategory() {
    this.paymentCategories = [];
    this.manageService.getAllPaymentCategory().subscribe(
      (data) => {
        this.paymentCategories = data;
        console.log("pe length: " + this.paymentCategories.length);
      }
    )
  }

  viewAddModal(template: TemplateRef<any>, paymentCategory: PaymentCategory, index: number) {
    if (paymentCategory == null) {
      this.categorySelected = new PaymentCategory;
      this.isEditing = false;
    } else {
      this.categorySelected = paymentCategory;
      this.duplicateCategorySelected = paymentCategory;
      this.indexSelected = index;
      this.isEditing = true;
    }
    this.selectedCategoryName = this.categorySelected.categoryName;
    this.addModalRef = this.modalService.show(template);
  }

  viewDeleteModal(template: TemplateRef<any>, paymentCategory: PaymentCategory, index: number) {
    this.categorySelected = paymentCategory;
    this.indexSelected = index;
    this.deleteModalRef = this.modalService.show(template);
  }

  restoreOriginalValue() {
    this.addModalRef.hide();
    if (this.isEditing) {
      this.paymentCategories[this.indexSelected].categoryName = this.duplicateCategorySelected.categoryName;
    }
  }

  deletePaymentCategory() {
    this.manageService.deletePaymentCategoryById(this.categorySelected.categoryId).subscribe(
      (resp) => {
        if (resp.ok) {
          this.paymentCategories.splice(this.indexSelected, 1);
          this.deleteModalRef.hide();
        } else {
          alert("Some error occured while deleting Payment Category");
        }
      }
    );
  }

  save() {
    this.categorySelected.categoryName = this.selectedCategoryName;
    if (this.isEditing) {
      this.manageService.updatePaymentCategory(this.categorySelected).subscribe(
        (data) => {
          this.getAllPaymentCategory();
          this.addModalRef.hide();
        },
        (error) => {
          alert("Some error occired while adding the Payment Category");
        }
      );
    } else {
      this.manageService.addPaymentCategory(this.categorySelected).subscribe(
        (data) => {
          this.getAllPaymentCategory();
          this.addModalRef.hide();
        },
        (error) => {
          alert("Some error occired while adding the Payment Category");
        }
      );
    }
  }

}
