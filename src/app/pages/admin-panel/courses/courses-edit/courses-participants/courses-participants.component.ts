import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { ParticipantsService } from 'src/app/services/participants.service';
import { Participant } from 'src/app/shared/participant.model';

@Component({
  selector: 'app-courses-participants',
  templateUrl: './courses-participants.component.html',
  styleUrls: ['./courses-participants.component.css'],
})
export class CoursesParticipantsComponent implements OnInit {
  id!: number;
  participants!: Participant[];
  courseParticipants!: Participant[];
  ready: boolean = false;
  searchText!: string;

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private participantsService: ParticipantsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];

      this.participantsService
        .getParticipants()
        .subscribe((participants: Participant[]) => {
          this.participants = participants;
        });
      this.coursesService
        .getParticipantsForCourse(this.id)
        .subscribe((participants: Participant[]) => {
          this.courseParticipants = participants;
        });
      this.ready = true;
    });
  }

  onAddParticipant(participantId: number, index: number) {
    this.coursesService
      .addParticipantToCourse(this.id, participantId)
      .subscribe((participant: Participant) => {
        this.courseParticipants.push(participant);
      });
  }

  onDeleteParticipant(participantId: number, index: number) {
    this.coursesService.deleteParticipantsForCourse(this.id, participantId);
    this.courseParticipants.splice(index, 1);
  }

  onSearch(event: any) {
    this.searchText = event.target?.value;
  }
}
