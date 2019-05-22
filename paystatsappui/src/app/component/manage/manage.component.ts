import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  option: string;
  optionName: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
        (params) => {
          this.option = params['option'];
          if (this.option) {
            this.setOptionName();
            console.log(this.option);
            // this.paymentService.searchTasks("taskCategory", category).subscribe(
            //   (data) => {
            //     this.tasks = data;
            //     //console.log(this.tasks + "activated");
            //     this.isEditing = true;
            //   }
            // );
          } else {
            console.log("No Links");
            // this.taskService.getAllTasks().subscribe(
            //   (data) => {
            //     this.tasks = data;
            //     //console.log(this.tasks + "all tasks");
            //   }
            // );
          }
        }
      );
  }

  setOptionName(){
    if(this.option=="paymentEntities") this.optionName = "Payment Entities";
    else if(this.option=="paymentCategories") this.optionName = "Payment Categories";
    else if(this.option=="paymentModes") this.optionName = "Payment Modes";
  }

}
