import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedUser:any

  logged:Subject<false|{email:string, id:number}> = new Subject(); //Manda un segnale quando ci si logga/slogga
  isLogged=this.logged.asObservable();
  
  private helper:JwtHelperService = new JwtHelperService()

  constructor(private http:HttpClient ) {}
  
  isAuthenticated():boolean{
    let t = localStorage.getItem("token");
    if(t){
      let token = JSON.parse(t.toString());
      if(this.helper.isTokenExpired(t)){
        this.logout()
        return false
      }
      return true
    }
    return false
  }

  login(u:UserLogin){
    console.log("logging...", u);
    
    this.http.post<{accessToken:string, user:any}>('http://localhost:3000/login', u).subscribe((res)=>{
      console.log("Logged", res);
      
      localStorage.setItem('token', JSON.stringify(res.accessToken));
      this.logged.next(res.user)
      this.loggedUser = res.user
    })
  }

  signup(u:UserSignup) {
    this.http.post<{accessToken:string, user:any}>('http://localhost:3000/signup', u).subscribe((res)=>{
      //Se iul server autentica e manda il token già al momento della registrazione (login automatico) possimao fare l'impsotazione del token nel subscribe
      localStorage.setItem('token', JSON.stringify(res.accessToken))
      this.logged.next(res.user)
      this.loggedUser = res.user
      //ALTRIMENTI possiamo automatizzre il login reindirizzando alla pagina login o eseguendo login con i dati di u
      // this.login({email:u.email, password:u.password})
    })
  }

  getPayload(){
    // let t = localStorage.getItem('token')
    // if(t){
    //   if(this.helper.isTokenExpired(t)) {
    //     this.logout()
    //     return false
    //   }
    //   return this.helper.decodeToken(t)
    // }
    // return false
    return this.loggedUser ? this.loggedUser : false
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