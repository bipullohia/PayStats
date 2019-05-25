import { Component, OnInit, TemplateRef } from '@angular/core';
import { PaymentEntity } from 'src/app/model/manage';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ManageService } from 'src/app/service/manage.service';
import { NgxNotificationService } from 'ngx-notification';

@Component({
  selector: 'app-payment-entity',
  templateUrl: './payment-entity.component.html',
  styleUrls: ['./payment-entity.component.css']
})
export class PaymentEntityComponent implements OnInit {

  editLogo: string;
  garbageLogo: string;
  paymentEntities: PaymentEntity[];
  entitySelected: PaymentEntity;
  selectedEntityName: string;
  indexSelected: number;
  isEditing: boolean;
  duplicateEntitySelected: PaymentEntity;

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
    this.getAllPaymentEntity();
  }

  getAllPaymentEntity() {
    this.paymentEntities = [];
    this.manageService.getAllPaymentEntity().subscribe(
      (data) => {
        this.paymentEntities = data;
        console.log("pe length: " + this.paymentEntities.length);
      }
    )
  }

  viewAddModal(template: TemplateRef<any>, paymentEntity: PaymentEntity, index: number) {
    if (paymentEntity == null) {
      this.entitySelected = new PaymentEntity;
      this.isEditing = false;
    } else {
      this.entitySelected = paymentEntity;
      this.duplicateEntitySelected = paymentEntity;
      this.indexSelected = index;
      this.isEditing = true;
    }
    this.selectedEntityName = this.entitySelected.entityName;
    this.addModalRef = this.modalService.show(template);
  }

  viewDeleteModal(template: TemplateRef<any>, paymentEntity: PaymentEntity, index: number) {
    this.entitySelected = paymentEntity;
    this.indexSelected = index;
    this.deleteModalRef = this.modalService.show(template);
  }

  restoreOriginalValue() {
    this.addModalRef.hide();
    if (this.isEditing) {
      this.paymentEntities[this.indexSelected].entityName = this.duplicateEntitySelected.entityName;
    }
  }

  deletePaymentEntity() {
    this.manageService.deletePaymentEntityById(this.entitySelected.entityId).subscribe(
      (resp) => {
        if (resp.ok) {
          this.paymentEntities.splice(this.indexSelected, 1);
          this.deleteModalRef.hide();
        } else {
          alert("Some error occured while deleting Payment Entity");
        }
      }
    );
  }

  save() {
    this.entitySelected.entityName = this.selectedEntityName;
    if (this.isEditing) {
      this.manageService.updatePaymentEntity(this.entitySelected).subscribe(
        (data) => {
          this.getAllPaymentEntity();
          this.addModalRef.hide();
        },
        (error) => {
          alert("Some error occired while adding the Payment Entity");
        }
      );
    } else {
      this.manageService.addPaymentEntity(this.entitySelected).subscribe(
        (data) => {
          this.getAllPaymentEntity();
          this.addModalRef.hide();
        },
        (error) => {
          alert("Some error occired while adding the Payment Entity");
        }
      );
    }
  }

}
