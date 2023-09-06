import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { CountUp } from 'countup.js';

interface Time {
  key: string;
  value: number;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  info!: any;

  countUpDeposit!: CountUp;
  countUpWithdraw!: CountUp;
  countUpBenefit!: CountUp;
  countUpParticipant!: CountUp;
  times: { key: string; value: number }[] = [
    { key: 'All Time', value: 36 },
    { key: 'This Month', value: 1 },
    { key: 'Last Three Months', value: 3 },
    { key: 'Last Six Months', value: 6 },
    { key: 'Last Year', value: 12 },
  ];

  firstChart!: any;
  secondChart!: any;
  thirdChart!: any;
  fourthChart!: any;
  fifthChart!: any;
  sixthChart!: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.initDashboard(36);
  }

  private initDashboard(duration: number) {
    this.http
      .get('http://localhost:3000/dashboard/' + duration)
      .subscribe((infos: any) => {
        this.info = infos;
        if (this.info) {
          this.countUpDeposit = new CountUp('deposit', this.info.deposits);
          this.countUpWithdraw = new CountUp('withdraw', this.info.withdraws);
          this.countUpBenefit = new CountUp('benefit', this.info.benefit);
          this.countUpParticipant = new CountUp(
            'participant',
            this.info.participants.participantsNumber
          );
          this.countUpDeposit.start();
          this.countUpBenefit.start();
          this.countUpWithdraw.start();
          this.countUpParticipant.start();

          this.firstChart = this.initChartData(
            ['Employees', 'Students', 'Unemployed'],
            [
              this.info.participants.employees,
              this.info.participants.students,
              this.info.participants.unemployed,
            ],
            'number of participants'
          );

          this.secondChart = this.initChartData(
            this.info.participants.major.majors,
            this.info.participants.major.participantsNumberPerMajor,
            'number of participants'
          );

          this.thirdChart = this.initChartData(
            this.info.instructors.educationalLevel.educationalLevels,
            this.info.instructors.educationalLevel
              .instructorsNumberPerEducationalLevel,
            'number of instructors'
          );

          this.fourthChart = this.initChartData(
            this.info.instructors.gender.genders,
            this.info.instructors.gender.instructorsNumberPerGender,
            'number of instructors'
          );

          this.fifthChart = this.initChartData(
            this.info.courses.coursesParticipants.coursesWithMostParticipants,
            this.info.courses.coursesParticipants
              .numberOfCoursesWithMostParticipants,
            'number of participants'
          );

          this.sixthChart = this.initChartData(
            this.info.courses.category.categories,
            this.info.courses.category.numberOfCoursesPerCategory,
            'number of courses'
          );
        }
      });
  }

  private initChartData(labels: any, data: any, label: string) {
    return {
      labels: labels,
      datasets: [
        {
          data,
          label,
        },
      ],
    };
  }

  initChartOptions(title: string) {
    return {
      plugins: {
        legend: {
          title: {
            display: true,
            text: title,
            font: {
              size: 25,
              family: 'serif',
            },
          },
          labels: {
            font: {
              size: 14,
              family: 'serif',
            },
          },
        },
      },
    };
  }

  convertDuration(duration: string): number {
    switch (duration) {
      case 'All Time':
        return 36;
      case 'This Month':
        return 1;
      case 'Last Three Months':
        return 3;
      case 'Last Six Months':
        return 6;
      case 'Last Year':
        return 12;
      default:
        return 36;
    }
  }

  onChangeTime(event: any) {
    this.initDashboard(this.convertDuration(event.target.value));
  }
}
