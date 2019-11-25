import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-referente',
  templateUrl: './add-referente.page.html',
  styleUrls: ['./add-referente.page.scss'],
})
export class AddReferentePage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  registrati() {
    this.router.navigate(['']);
    alert('Hai registrato un nuovo referente');
  }

  goBack() {
    this.router.navigate(['dashboard-def']);
  }
}
