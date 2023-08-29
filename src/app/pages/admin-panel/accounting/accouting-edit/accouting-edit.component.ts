import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BillsService } from 'src/app/services/bills.service';
import { Bill } from 'src/app/shared/bill.model';

@Component({
  selector: 'app-accouting-edit',
  templateUrl: './accouting-edit.component.html',
  styleUrls: ['./accouting-edit.component.css'],
})
export class AccoutingEditComponent implements OnInit {
  billForm!: FormGroup;
  editMode!: boolean;
  id!: string;
  bill!: Bill;
  deposit: boolean = true;

  statuss = ['IN_PROGRESS', 'DONE'];

  paymentMethods: string[] = [
    'Credit Card',
    'Debit Card',
    'PayPal',
    'Apple Pay',
    'Google Pay',
    'Bank Transfer',
    'Cash',
    'Cryptocurrency',
    'Stripe',
    'Square',
    'Cash App',
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private billsService: BillsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] !== undefined;
    });
    if (this.editMode) {
      this.billsService.getBillById(this.id).subscribe((bill: Bill) => {
        this.bill = bill;
        this.initForm();
      });
    } else {
      this.initForm();
    }
  }

  private initForm() {
    this.billForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      type: new FormControl('deposit', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      sender: new FormControl('Horizon Data', [Validators.required]),
      receiver: new FormControl('Horizon Data', [Validators.required]),
      amount: new FormControl('', [Validators.required, Validators.min(0)]),
      status: new FormControl('IN PROGRESS', [Validators.required]),
      paymentMethod: new FormControl('', [Validators.required]),
    });

    if (this.editMode && this.bill) {
      this.billForm.patchValue({
        id: this.bill.id,
        title: this.bill.title,
        description: this.bill.description,
        amount: this.bill.amount,
        type: this.bill.type,
        date: this.bill.date,
        status: this.bill.status,
        sender: this.bill.sender,
        receiver: this.bill.receiver,
        paymentMethod: this.bill.paymentMethod,
      });
    }
  }

  onSubmit() {
    if (this.billForm.valid) {
      const billData = {
        title: this.billForm.value.title,
        description: this.billForm.value.description,
        type: this.billForm.value.type,
        sender: this.billForm.value.sender,
        receiver: this.billForm.value.receiver,
        status: this.billForm.value.status,
        date: this.billForm.value.date,
        amount: this.billForm.value.amount,
        paymentMethod: this.billForm.value.paymentMethod,
      };

      if (this.editMode) {
        this.billsService.updateBill(this.id, billData);
      } else {
        this.billsService.addBill(billData);
      }

      this.router.navigate(['admin', 'accounting']);
    }
  }

  onCancel() {
    this.billForm.reset();
    this.router.navigate(['admin', 'bills']);
  }

  onCategoryChange(event: any) {
    // this.bills
    //   .getInstructorsByMajor(event.target.value)
    //   .subscribe((instructors: Instructor[]) => {
    //     if (instructors.length > 0) {
    //       this.instructors = instructors;
    //       this.selectedCategory = true;
    //     } else {
    //       this.selectedCategory = false;
    //     }
    //   });
  }
}
