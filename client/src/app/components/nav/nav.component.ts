import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  toggleNav() {
    let navLinks = document.getElementById('navbarCollapse');
    console.log(navLinks);
    navLinks.classList.toggle('collapse');
  }
}
