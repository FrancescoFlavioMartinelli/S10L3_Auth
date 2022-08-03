import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'S10L3_Auth';

  //AUTH
  /*1 - Client -> Server : effetuare il login
  Form login
  contattare API login
  2 - Server -> Client : ricevere il token (o il rifiuto di login)
  Se non da un risultato positivo indicare i dati sbagliati
  Se rceviamo il Token siamo loggati e procediamo
  3 - Client -> LocalStorage : salviamo il token per uso futuro
  4 - Clinet -> Server : a ogni richiesta aggiungianmo il token negli Headers
  Se il token è valido riceveremo i dati dal server 
  Altrimenti se il token non è valido ma lo abbiamo salvato DOBBIAMO fare un logout -> rimandare al login
*/
}
