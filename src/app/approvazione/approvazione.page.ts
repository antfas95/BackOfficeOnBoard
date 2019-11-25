import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approvazione',
  templateUrl: './approvazione.page.html',
  styleUrls: ['./approvazione.page.scss'],
})
export class ApprovazionePage implements OnInit {

  constructor(public router: Router) {}

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['dashboard-def']);
  }

}
