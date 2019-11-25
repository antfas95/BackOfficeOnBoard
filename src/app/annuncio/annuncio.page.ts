import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-annuncio',
  templateUrl: './annuncio.page.html',
  styleUrls: ['./annuncio.page.scss'],
})
export class AnnuncioPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['dashboard-def']);
  }

  vistaAnnunci() {
    this.router.navigate(['view-annunci']);
  }
}
