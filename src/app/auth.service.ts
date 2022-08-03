import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  logged:Subject<boolean> = new Subject();
  isLogged=this.logged.asObservable();

  constructor(private http:HttpClient, private helper:JwtHelperService) {}

  

  login(u:UserLogin){
    this.http.post('/login', {
      body: JSON.stringify(u)
    }).subscribe((res)=>{
      localStorage.setItem('token', JSON.stringify(res))
      this.logged.next(true)
    })
  }

  signup(u:UserSignup) {
    this.http.post('/signup', {
      body: JSON.stringify(u)
    }).subscribe((res)=>{
      //Se iul server autentica e manda il token già al momento della registrazione (login automatico) possimao fare l'impsotazione del token nel subscribe
      // localStorage.setItem('token', JSON.stringify(res))
      //ALTRIMENTI possiamo automatizzre il login reindirizzando alla pagina login o eseguendo login con i dati di u
      this.login({email:u.email, password:u.password})
    })
  }

  getPayload(){
    let t = localStorage.getItem('token')
    if(t){
      if(this.helper.isTokenExpired(t)) {
        this.logout()
        return false
      }
      return this.helper.decodeToken(t)
    }
    return false
  }


  logout(){
    localStorage.removeItem('token')
    this.logged.next(false)
  }
}


interface UserLogin {
  email: string,
  password: string
}
interface UserSignup {
  email: string,
  password: string,
  name:string,
  age: number
}