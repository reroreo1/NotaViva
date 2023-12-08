import { Component } from '@angular/core';
import {SocketioService} from "../services/socketio.service";
import {Router} from "@angular/router";
import {ConfigService} from "../services/config.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'STT App';
  connectedUser: any;
  public notifications = 0;

  constructor(private configService: ConfigService,
              private router: Router,
              private socketService: SocketioService) {}

  ngOnInit(): void {
    this.connectedUser = localStorage.getItem('connectedUser');
    // console.log('Begin socket io part:');
    // Open connection with server socket

    // this.socketService.setupSocketConnection();

    // console.log('End socket io part:');
  }


  onLogout(): void {
    // console.log('Logout');
    this.configService.authService.logout();
    localStorage.removeItem('connectedUser');
    localStorage.removeItem('idUser');
    this.router.navigate(['home']).then(() => {
      window.location.reload();
    });
  }
}
