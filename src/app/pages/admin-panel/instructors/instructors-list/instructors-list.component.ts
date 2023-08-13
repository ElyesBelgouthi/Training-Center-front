import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InstructorsService } from 'src/app/services/instructors.service';
import { Instructor } from 'src/app/shared/Instructor.model';

@Component({
  selector: 'app-instructors-list',
  templateUrl: './instructors-list.component.html',
  styleUrls: ['./instructors-list.component.css'],
})
export class InstructorsListComponent implements OnInit {
  p: number = 1;
  addingNew: boolean = false;

  instructors: Instructor[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private instructorsService: InstructorsService
  ) {}

  ngOnInit(): void {
    this.instructorsService.getInstructors().subscribe(
      (instructors: Instructor[]) => {
        this.instructors = instructors;
      },
      (error) => {
        console.error('Error fetching instructors', error);
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
    this.instructorsService.deleteInstructor(id);
    this.instructors.splice(index, 1);
  }
}
