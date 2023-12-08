import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {MsalService} from '@azure/msal-angular';
import {environment} from '../../environments/environment';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})

/*
* @Author : Khalid MEZOUARI
*/

export class ConfigService {

  header = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT',
    'Access-Control-Allow-Origin': '*'
  };

  httpOptions = new HttpHeaders(this.header);

  //headerMultipart = new HttpHeaders({ 'encrypt': 'multipart/form-data' });

  url = environment.urlServerApi;

  constructor(private http: HttpClient, public authService: MsalService) {
  }

  login(): void {
    const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

    if (true) {
      this.authService.loginRedirect();
    } else {
      this.authService.loginPopup();
    }
  }

  // CRUD Operations:
  // --------------------------------------------------
  // Create method generic: objectT is the object to save.
  // --------------------------------------------------

  save<T>(collection: string, objectT: T[]) {
    return this.http.post(`${this.url}/${collection}/`, objectT, {headers: this.httpOptions});
  }

  // ---------------------------------------------------
  // Update method generic: objectT is the object to update.
  // ---------------------------------------------------

  update<T>(collection: string, objectT: T) {
    console.log(objectT);
    //@ts-ignore
    return this.http.put(`${this.url}/${collection}/${objectT.id}`, JSON.stringify(objectT), {headers: this.httpOptions});
  }

  // ---------------------------------------------------
  // Delete method generic: objectT is the object to remove.
  // ---------------------------------------------------

  remove<T>(collection: string, objectT: T) {
    // @ts-ignore
    return this.http.delete(`${this.url}/${collection}/${objectT.id}`, {headers: this.httpOptions});
  }

  removeAll<T>(collection: string) {
    return this.http.delete(`${this.url}/${collection}`, {headers: this.httpOptions});
  }

  // ---------------------------------------------------
  // GetAll method generic
  // ---------------------------------------------------
  findAll<T>(collection: string) {
    return this.http.get<T[]>(`${this.url}/${collection}/`, {headers: this.httpOptions});
  }

  findById<T>(collection: string, id: string) {
    return this.http.get<T>(`${this.url}/${collection}/${id}`, {headers: this.httpOptions});
  }

  // Find user by email:
  getUserByEmail(email: string) {
    return this.http.get<User>(`${this.url}/user/email/${email}`, {headers: this.httpOptions});
  }

  // upload profile picutre:
  uploadImg(formData: FormData, id: number) {
    return this.http.post(`${this.url}/user/profile/${id}`, formData);
  }

  deleteImg(id: number) {
    return this.http.delete(`${this.url}/user/profile/${id}`);
  }

  changeAccount(id: number) {
    return this.http.put(`${this.url}/user/account/${id}`, null);
  }

}
