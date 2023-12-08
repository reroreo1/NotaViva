import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

/*
* @Author : Khalid MEZOUARI
*/

export class GenerateCrudService<T> {

  /*
  * constructor
  * @param configService
  * @param collectionName
  */
  constructor(protected configService: ConfigService, protected collectionName: string) { }

  // create item:
  save(objectT: T[]) {
    return this.configService.save<T>(this.collectionName, objectT);
  }

  // Update item:
  update(objectT: T) {
    return this.configService.update<T>(this.collectionName, objectT);
  }

  // Delete item:
  delete(objectT: T) {
    return this.configService.remove<T>(this.collectionName, objectT);
  }

  // Delete all items:
  deleteAll(objectT: T) {
    return this.configService.removeAll<T>(this.collectionName);
  }

  // Get all items:
  getAll() {
    return this.configService.findAll<T>(this.collectionName);
  }

  // get One by Id:
  findById(id: string) {
    return this.configService.findById<T>(this.collectionName, id);
  }
}
