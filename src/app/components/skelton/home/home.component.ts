import { Component, HostListener, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConfigService } from 'src/app/services/config.service';
import { UserService } from 'src/app/services/user.service';
import {MsalBroadcastService} from "@azure/msal-angular";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  mobile: boolean | undefined;
  user: any;
  private subscription: Subscription | undefined;

  constructor(private broadcastService: MsalBroadcastService, private configService: ConfigService, private userService: UserService) { }

  ngOnInit(): void {

   /* const width: number | undefined = $(window).width();
    // MOBILE

      this.mobile = (width < 640);

    this.broadcastService.subscribe('msal:loginFailure', (payload) => {
      console.log('login failure HOME ' + JSON.stringify(payload));
    });
    const sub = this.broadcastService.subscribe('msal:acquireTokenFailure', x => {
      sub.unsubscribe();
      this.configService.authService.loginRedirect();
      window.location.reload();
    });

    this.broadcastService.subscribe('msal:loginSuccess', (payload) => {
      console.log('login success HOME ' + JSON.stringify(payload));
      console.log(this.configService.authService);
      localStorage.setItem('token', payload['_token']);
      this.verifyUser();
    });
  }

  verifyUser(): void {
    const emailConnected = this.configService.authService.getUser().displayableId;
    this.userService.getUserByEmail(emailConnected).subscribe(
      (response) => {

        console.log(response);
        console.log(this.configService.authService.getUser().displayableId);
        // @ts-ignore
        this.user = response;
        console.log(this.user);
        if (this.user && this.user.accountActive) {
          localStorage.setItem('connectedUser', JSON.stringify(this.user));
          localStorage.setItem('idUser', this.user.id);
          // TODO: update last authentication date history:
          window.location.reload();
        } else {
          console.log('user not found or account is locked');
          // disconnect
          this.onLogout();
        }
      }, error => {
        console.log('error:');
        // console.log(error);
      });*/

  }

  onLogout(): void {
    this.configService.authService.logout();
    localStorage.removeItem('token');
    localStorage.removeItem('connectedUser');
    localStorage.removeItem('idUser');
    localStorage.clear();
    sessionStorage.clear();
    /*this.router.navigate(['home']).then(() => {
        window.location.reload();
    });*/
    // console.log('DECONNEXION');
  }

  @HostListener('window:unload', ['$event'])
  handleUnload(event: any): void {
    window.location.reload();
  }
}
