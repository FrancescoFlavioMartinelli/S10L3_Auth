import { HttpClient } from '@angular/common/http';
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
  constructor(private auth:AuthService, private http:HttpClient) { }

  ngOnInit(): void {
    this.loggedSub = this.auth.isLogged.subscribe((res)=>{
      this.logged = res!=false
    })
  }

  ngOnDestroy(): void {
    this.loggedSub.unsubscribe()
  }

  testIntercept() {
    localStorage.setItem("token", "test")
    this.http.get("http://localhost:3000/posts").subscribe((res)=>{
      console.log("POST", res);
      
    })
  }

}
