import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {CommunService} from '../../../services/commun.service';
import {ConfigService} from '../../../services/config.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  connectedUser: any;
  imgNotFound: boolean | undefined;
  unseenNotifs = 0;
  urlServer = environment.urlServerApi;

  constructor(public communService: CommunService,
              private configService: ConfigService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.connectedUser = localStorage.getItem('connectedUser');
    if (this.connectedUser) {
    // TODO
    }
  }

  onLogout(): void {
    this.configService.authService.logout();
    localStorage.removeItem('connectedUser');
    localStorage.removeItem('idUser');
    localStorage.removeItem('token');
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['home']).then(() => {
      window.location.reload();
    });
  }

  imgHeaderError(): void {
    this.imgNotFound = true;
  }

}
