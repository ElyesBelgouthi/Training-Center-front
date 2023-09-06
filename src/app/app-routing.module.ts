import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { DashboardComponent } from './pages/admin-panel/dashboard/dashboard.component';
import { ProfileComponent } from './pages/admin-panel/profile/profile.component';
import { AccountingComponent } from './pages/admin-panel/accounting/accounting.component';
import { CoursesComponent } from './pages/admin-panel/courses/courses.component';
import { ParticipantsComponent } from './pages/admin-panel/participants/participants.component';
import { ReportsComponent } from './pages/admin-panel/reports/reports.component';

import { TimetableComponent } from './pages/admin-panel/timetable/timetable.component';
import { InstructorsComponent } from './pages/admin-panel/instructors/instructors.component';
import { InstructorsEditComponent } from './pages/admin-panel/instructors/instructors-edit/instructors-edit.component';
import { InstructorsListComponent } from './pages/admin-panel/instructors/instructors-list/instructors-list.component';
import { CoursesListComponent } from './pages/admin-panel/courses/courses-list/courses-list.component';
import { CoursesEditComponent } from './pages/admin-panel/courses/courses-edit/courses-edit.component';
import { CoursesMaterialsComponent } from './pages/admin-panel/courses/courses-edit/courses-materials/courses-materials.component';
import { ParticipantsListComponent } from './pages/admin-panel/participants/participants-list/participants-list.component';
import { ParticipantsEditComponent } from './pages/admin-panel/participants/participants-edit/participants-edit.component';
import { CoursesParticipantsComponent } from './pages/admin-panel/courses/courses-edit/courses-participants/courses-participants.component';
import { AccoutingListComponent } from './pages/admin-panel/accounting/accouting-list/accouting-list.component';
import { AccoutingEditComponent } from './pages/admin-panel/accounting/accouting-edit/accouting-edit.component';
import { authGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminPanelComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'accounting',
        component: AccountingComponent,
        children: [
          {
            path: '',
            component: AccoutingListComponent,
          },
          {
            path: 'new',
            component: AccoutingEditComponent,
          },
          {
            path: ':id/edit',
            component: AccoutingEditComponent,
          },
        ],
      },
      {
        path: 'courses',
        component: CoursesComponent,
        children: [
          {
            path: '',
            component: CoursesListComponent,
          },
          {
            path: 'new',
            component: CoursesEditComponent,
          },
          {
            path: ':id/edit',
            component: CoursesEditComponent,
          },
          { path: ':id/edit/materials', component: CoursesMaterialsComponent },
          {
            path: ':id/edit/participants',
            component: CoursesParticipantsComponent,
          },
        ],
      },
      {
        path: 'participants',
        component: ParticipantsComponent,
        children: [
          {
            path: '',
            component: ParticipantsListComponent,
          },
          {
            path: 'new',
            component: ParticipantsEditComponent,
          },
          {
            path: ':id/edit',
            component: ParticipantsEditComponent,
          },
        ],
      },
      {
        path: 'instructors',
        component: InstructorsComponent,
        children: [
          {
            path: '',
            component: InstructorsListComponent,
          },
          {
            path: 'new',
            component: InstructorsEditComponent,
          },
          {
            path: ':id/edit',
            component: InstructorsEditComponent,
          },
        ],
      },
      {
        path: 'reports',
        component: ReportsComponent,
      },

      {
        path: 'timetable',
        component: TimetableComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
