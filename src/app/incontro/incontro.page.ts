import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-incontro',
  templateUrl: './incontro.page.html',
  styleUrls: ['./incontro.page.scss'],
})
export class IncontroPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['dashboard-def']);
  }

  inseriscIncontro() {
    alert ('Incontro memorizzato con successo');
  }
}