import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  text = "non loggato"

  constructor(private aiuth:AuthService) { }

  ngOnInit(): void {
    this.aiuth.isLogged.subscribe((res)=>{
      if(res)
      this.text = res.email
      else
      this.text = "Non Loggato"
    })
  }

  login(){
    this.aiuth.login({email:"test@email.com", password:"test"})
  }
}
