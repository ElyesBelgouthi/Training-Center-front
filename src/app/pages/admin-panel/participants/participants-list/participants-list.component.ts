import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ParticipantsService } from 'src/app/services/participants.service';
import { Participant } from 'src/app/shared/participant.model';

@Component({
  selector: 'app-participants-list',
  templateUrl: './participants-list.component.html',
  styleUrls: ['./participants-list.component.css'],
})
export class ParticipantsListComponent implements OnInit {
  p: number = 1;
  addingNew: boolean = false;
  searchText!: string;

  participants: Participant[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private participantsService: ParticipantsService
  ) {}

  ngOnInit(): void {
    this.participantsService
      .getParticipants()
      .subscribe((participants: Participant[]) => {
        this.participants = participants;
      });
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
    this.participantsService.deleteParticipant(id);
    this.participants.splice(index, 1);
  }
  onSearch(event: any) {
    this.searchText = event.target?.value;
  }
}
