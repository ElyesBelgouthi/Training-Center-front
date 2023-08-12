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
import { SettingsComponent } from './pages/admin-panel/settings/settings.component';
import { TimetableComponent } from './pages/admin-panel/timetable/timetable.component';
import { InstructorsComponent } from './pages/admin-panel/instructors/instructors.component';
import { InstructorsEditComponent } from './pages/admin-panel/instructors/instructors-edit/instructors-edit.component';
import { InstructorsListComponent } from './pages/admin-panel/instructors/instructors-list/instructors-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminPanelComponent,
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
      },
      {
        path: 'courses',
        component: CoursesComponent,
      },
      {
        path: 'participants',
        component: ParticipantsComponent,
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
        path: 'settings',
        component: SettingsComponent,
      },
      {
        path: 'timetable',
        component: TimetableComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
