import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import {HomeComponent} from "./components/skelton/home/home.component";
import {HeaderComponent} from "./components/skelton/header/header.component";
import {NavbarSectionComponent} from "./components/skelton/navbar-section/navbar-section.component";
import {NotFoundComponent} from "./components/skelton/not-found/not-found.component";
import {CommunService} from "./services/commun.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CustomHttpInterceptor} from "./services/custom.http.interceptor";
import {SocketioService} from "./services/socketio.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FooterComponent} from "./components/skelton/footer/footer.component";
import { NewNoteComponent } from './components/frontend/new-note/new-note.component';
import { QuillModule } from 'ngx-quill';
import {
  MsalBroadcastService,
  MsalGuard,
  MsalGuardConfiguration,
  MsalInterceptorConfiguration,
  MsalModule,
  MsalService
} from "@azure/msal-angular";
import {
  BrowserCacheLocation,
  InteractionType,
  IPublicClientApplication,
  PublicClientApplication
} from "@azure/msal-browser";
import {environment} from "../environments/environment";
import { AudioProcessorComponent } from './components/frontend/audio-processor/audio-processor.component';


export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.clientID,
      authority: environment.authority,
      redirectUri: environment.originUrl,
      postLogoutRedirectUri: environment.originUrl
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: true
    },
    system: {
      loggerOptions: {
        loggerCallback: () => {},
        piiLoggingEnabled: false
      }
    }
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  // protectedResourceMap.set("https://graph.microsoft.com/v1.0/me", ["user.read"]);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['user.read'],

    },
    loginFailedRoute: "./home"
  };
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    NavbarSectionComponent,
    NotFoundComponent,
    NewNoteComponent,
    AudioProcessorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularEditorModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    MsalModule.forRoot( MSALInstanceFactory(), MSALGuardConfigFactory(), MSALInterceptorConfigFactory())

  ],
  providers: [
    CommunService,
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true
    },
   // { provide: NgbDateAdapter, useClass: CustomDateAdapter },
    //{ provide: NgbDateFRParserFormatter, useClass: NgbDateFRParserFormatter },
   // DatePipe,
    SocketioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
