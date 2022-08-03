import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  logged = false
  loggedSub!:Subscription;
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.loggedSub = this.auth.isLogged.subscribe((res)=>{
      this.logged = res!=false
    })
  }

  ngOnDestroy(): void {
    this.loggedSub.unsubscribe()
  }

}
