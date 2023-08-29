import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BillsService } from 'src/app/services/bills.service';
import { Bill } from 'src/app/shared/bill.model';

@Component({
  selector: 'app-accouting-list',
  templateUrl: './accouting-list.component.html',
  styleUrls: ['./accouting-list.component.css'],
})
export class AccoutingListComponent implements OnInit {
  p: number = 1;
  addingNew: boolean = false;
  searchText!: string;
  bills: Bill[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private billsService: BillsService
  ) {}

  ngOnInit(): void {
    this.billsService.getBills().subscribe(
      (bills: Bill[]) => {
        this.bills = bills;
      },
      (error) => {
        console.error('Error fetching bills', error);
      }
    );
  }

  onAddNew() {
    this.addingNew = true;
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEdit(index: number) {
    this.router.navigate([index, 'edit'], { relativeTo: this.route });
  }

  onDelete(id: number, index: number, event: Event) {
    event.stopPropagation();
    this.billsService.deleteBill(id);
    this.bills.splice(index, 1);
  }

  onSearch(event: any) {
    this.searchText = event.target?.value;
  }
}
