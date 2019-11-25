import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-annunci',
  templateUrl: './view-annunci.page.html',
  styleUrls: ['./view-annunci.page.scss'],
})
export class ViewAnnunciPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['dashboard']);
  }

  modificaAnnuncio() {
    this.router.navigate(['annuncio']);
  }

  eliminaAnnunci() {
    alert('Sei sicuro di voler eliminare');
  }
}
