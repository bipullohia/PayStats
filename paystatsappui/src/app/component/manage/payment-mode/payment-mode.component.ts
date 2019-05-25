import { Component, OnInit, TemplateRef } from '@angular/core';
import { PaymentMode } from 'src/app/model/manage';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ManageService } from 'src/app/service/manage.service';
import { NgxNotificationService } from 'ngx-notification';

@Component({
  selector: 'app-payment-mode',
  templateUrl: './payment-mode.component.html',
  styleUrls: ['./payment-mode.component.css']
})
export class PaymentModeComponent implements OnInit {

  editLogo: string;
  garbageLogo: string;
  paymentModes: PaymentMode[];
  modeSelected: PaymentMode;
  selectedModeName: string;
  indexSelected: number;
  isEditing: boolean;
  duplicateModeSelected: PaymentMode;

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
    this.getAllPaymentMode();
  }

  getAllPaymentMode() {
    this.paymentModes = [];
    this.manageService.getAllPaymentMode().subscribe(
      (data) => {
        this.paymentModes = data;
        console.log("pe length: " + this.paymentModes.length);
      }
    )
  }

  viewAddModal(template: TemplateRef<any>, paymentMode: PaymentMode, index: number) {
    if (paymentMode == null) {
      this.modeSelected = new PaymentMode;
      this.isEditing = false;
    } else {
      this.modeSelected = paymentMode;
      this.duplicateModeSelected = paymentMode;
      this.indexSelected = index;
      this.isEditing = true;
    }
    this.selectedModeName = this.modeSelected.paymodeName;
    this.addModalRef = this.modalService.show(template);
  }

  viewDeleteModal(template: TemplateRef<any>, paymentMode: PaymentMode, index: number) {
    this.modeSelected = paymentMode;
    this.indexSelected = index;
    this.deleteModalRef = this.modalService.show(template);
  }

  restoreOriginalValue() {
    this.addModalRef.hide();
    if (this.isEditing) {
      this.paymentModes[this.indexSelected].paymodeName = this.duplicateModeSelected.paymodeName;
    }
  }

  deletePaymentMode() {
    this.manageService.deletePaymentModeById(this.modeSelected.paymodeId).subscribe(
      (resp) => {
        if (resp.ok) {
          this.paymentModes.splice(this.indexSelected, 1);
          this.deleteModalRef.hide();
        } else {
          alert("Some error occured while deleting Payment Mode");
        }
      }
    );
  }

  save() {
    this.modeSelected.paymodeName = this.selectedModeName;
    if (this.isEditing) {
      this.manageService.updatePaymentMode(this.modeSelected).subscribe(
        (data) => {
          this.getAllPaymentMode();
          this.addModalRef.hide();
        },
        (error) => {
          alert("Some error occired while adding the Payment Mode");
        }
      );
    } else {
      this.manageService.addPaymentMode(this.modeSelected).subscribe(
        (data) => {
          this.getAllPaymentMode();
          this.addModalRef.hide();
        },
        (error) => {
          alert("Some error occired while adding the Payment Mode");
        }
      );
    }
  }

}
