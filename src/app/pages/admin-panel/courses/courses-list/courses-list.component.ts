import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { Course } from 'src/app/shared/course.model';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css'],
})
export class CoursesListComponent implements OnInit {
  p: number = 1;
  addingNew: boolean = false;

  courses: Course[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private coursesService: CoursesService
  ) {}

  ngOnInit(): void {
    this.coursesService.getCourses().subscribe(
      (courses: Course[]) => {
        this.courses = courses;
      },
      (error) => {
        console.error('Error fetching courses', error);
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
    this.coursesService.deleteCourse(id);
    this.courses.splice(index, 1);
  }
}
