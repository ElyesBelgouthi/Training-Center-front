import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { AsideComponent } from './aside/aside.component';
import { DashboardComponent } from './pages/admin-panel/dashboard/dashboard.component';
import { ProfileComponent } from './pages/admin-panel/profile/profile.component';
import { SettingsComponent } from './pages/admin-panel/settings/settings.component';
import { CoursesComponent } from './pages/admin-panel/courses/courses.component';
import { ParticipantsComponent } from './pages/admin-panel/participants/participants.component';
import { InstructorsComponent } from './pages/admin-panel/instructors/instructors.component';
import { AccountingComponent } from './pages/admin-panel/accounting/accounting.component';
import { TimetableComponent } from './pages/admin-panel/timetable/timetable.component';
import { ReportsComponent } from './pages/admin-panel/reports/reports.component';
import { InstructorsEditComponent } from './pages/admin-panel/instructors/instructors-edit/instructors-edit.component';
import { InstructorsListComponent } from './pages/admin-panel/instructors/instructors-list/instructors-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    AdminPanelComponent,
    AsideComponent,
    DashboardComponent,
    ProfileComponent,
    SettingsComponent,
    CoursesComponent,
    ParticipantsComponent,
    InstructorsComponent,
    AccountingComponent,
    TimetableComponent,
    ReportsComponent,
    InstructorsEditComponent,
    InstructorsListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
