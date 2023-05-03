import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'leave-tracker-poc';
  constructor(public router: Router) {
    // console.log(t)
    // console.log(this.router.ur)


  }
}
