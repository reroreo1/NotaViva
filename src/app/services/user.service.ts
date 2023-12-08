import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { ConfigService } from './config.service';
import { GenerateCrudService } from './generate-crud.service';

@Injectable({
  providedIn: 'root'
})

export class UserService extends GenerateCrudService<User> {

  // Constructor
  constructor(configService: ConfigService) {
    super(configService, 'user');
  }

  getUserByEmail(email: string) {
    return this.configService.getUserByEmail(email.toLowerCase());
  }

  getAllRoles() {
    return this.configService.findAll('role');
  }

  uploadImage(formData: any, id: number) {

    return this.configService.uploadImg(formData, id);
  }
  deleteImage(id: any) {
    return this.configService.deleteImg(id);
  }
  changeAccount(id: any) {
    return this.configService.changeAccount(id);
  }

}
