import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  nome:string|false = false

  logged = false

  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.auth.isLogged.subscribe((res)=>{
      console.log(res);
      
      if(res){
        this.nome = res.email
        this.logged = true
        console.log(this.nome);
      } else {
        this.nome = false
        this.logged = false
        // this.router.navigate(['/login']);
      }
    })
  }

  logout(){
    this.auth.logout()
  }

}
