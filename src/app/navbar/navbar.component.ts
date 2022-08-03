import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  nome:string|false = false

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.auth.isLogged.subscribe((res)=>{
      if(res){
        this.nome = this.auth.getPayload()
        console.log(this.nome);
      } else {
        this.nome = false
      }
      
    })
  }

}
