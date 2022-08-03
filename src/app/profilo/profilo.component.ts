import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.css']
})
export class ProfiloComponent implements OnInit {

  constructor(private router: Router, private auth:AuthService) { }

  ngOnInit(): void {
    this.auth.isLogged.subscribe((res)=>{
      if(!res){
        this.router.navigate(['/login'])
      }
    })
  }

}
