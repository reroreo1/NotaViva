import { ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CommunService } from '../services/commun.service';
import { Alerts } from '../utils/alerts';


/*
* GenericComponent : class for CRUD datatables components.
*@Author KMEZOUARI
*
*/

export class GenericComponent<T> {

  // list of objects to show in the dataTable:
  objects: T[];
  // Our future instance of DataTable
  dataTable: any;
  // FormGroup: to init with the model of object
  objectForm: FormGroup;
  // Saved object Result:
  protected savedObject: T;
  submitted = false;
  currentObject: T;

  // Affichage de données coté Front OFFICE:

  connectedUser: any;
  mobile: boolean;
  errorLoadingImg = [];
  successMessage: string;

  // error dates : begin > end:
  errorDates: any = { isError: false, errorMessage: '' };
  errorDateFin: boolean;
  urlServer = environment.urlServerApi;
  alert: Alerts;
  listEnum;

  // Constructor:
  constructor(
    protected formBuilder: FormBuilder,
    protected objectService: any,
    protected router: Router,
    protected route: ActivatedRoute,
    protected chRef: ChangeDetectorRef,
    protected communService: CommunService
  ) {
    this.alert = new Alerts();
    this.hasPermissionAccess();
    var width = $(window).width();
    //MOBILE
    if (width < 640) {
      this.mobile = true;
    } else {
      this.mobile = false;
    }
  }

  //---------------------------------------------------------------
  //-- Method: get All objects.
  //---------------------------------------------------------------

  getAll() {
    console.log('invoked: getAll');
    this.objectService.getAll().subscribe(
      data => {
        this.objects = data;
        console.log("ok");
        console.log(data);
        this.chRef.detectChanges();
        const table: any = $('table');
        this.dataTable = table.DataTable({
          responsive: true,
          retrieve: true,
          paging: true,
          searching: true,
          "language": {
            "url": "../assets/i18n/fr/dataTable.fr.json"
          }
        });
      }, error => {
        console.log('error: ');
        console.log(error);
      });
  }
  getCommunService() {
    return this.communService;
  }

  //---------------------------------------------------------------
  //-- Method findone object
  //---------------------------------------------------------------
  async findObjectById(id) {
    await this.objectService.findById(id).subscribe(
      data => {
        this.currentObject = data;
        //console.log(data);
      }, error => {
        console.log('error');
      });
  }

  //---------------------------------------------------------------
  //-- Method Save object
  //---------------------------------------------------------------
  onSubmit() {
    this.submitted = true;
    // stop the process here if form is invalid
    if (this.objectForm.invalid) {
      return;
    }

    // appel du service save message:
    this.successMessage = 'ajouté(e)';
    console.log(this.objectForm.getRawValue());
    this.objectService.save(this.objectForm.getRawValue()).subscribe(
      data => {
        this.savedObject = data;
        this.alert.showAlertModal("#addModal", 200, this);

      }, error => {
        console.log("error");
        console.log(error);
        this.alert.showAlertModal("#addModal", 500, this);
      });
  }

  //---------------------------------------------------------------
  //-- Method select object to delete
  //---------------------------------------------------------------
  onDelete(object) {
    this.currentObject = object;
  }

  //---------------------------------------------------------------
  //-- Method delete object
  //---------------------------------------------------------------
  onConfirmDelete() {
    this.successMessage = 'supprimé(e)';
    this.objectService.delete(this.currentObject).subscribe(
      data => {
        this.alert.showAlertModal("#removeModal", 200, this);
      }, error => {
        this.alert.showAlertModal("#removeModal", 500, this);
      });
  }

  //---------------------------------------------------------------
  //-- Method select current object to update
  //---------------------------------------------------------------
  onUpdate(object) {
    // transform current object to formGroup:
    this.currentObject = object;
    if (this.objectForm)
      this.objectForm.patchValue(object);
  }

  //---------------------------------------------------------------
  //-- Method confirm update:
  //---------------------------------------------------------------
  onConfirmUpdate() {
    this.submitted = true;
    // stop the process here if form is invalid
    if (this.objectForm.invalid) {
      return;
    }
    this.successMessage = 'modifié(e)';
    console.log(this.objectForm.getRawValue());
    this.objectService.update(this.objectForm.getRawValue()).subscribe(
      data => {
        this.alert.showAlertModal("#modifyModal", 200, this);
      }, error => {
        this.alert.showAlertModal("#modifyModal", 500, this);
      });
  }

  refreshDatatable() {
    window.setTimeout(function () {
      window.location.reload();
    }, 0);
  }

  getSavedObject() {
    if (this.savedObject)
      return this.savedObject;
  }

  imgError(item) {
    console.log('invoked img error')
    this.errorLoadingImg[item.id] = true;
  }

  keys(): Array<string> {
    var keys = Object.keys(this.listEnum);
    return keys;
  }
  ValueOfKey(key) {
    return this.listEnum[key];
  }
  hasPermissionAccess() {
    // console.log(this.route.snapshot.data.roles)
    this.connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
    if (this.route.snapshot.data && this.route.snapshot.data.roles ) {
      if (this.connectedUser && this.route.snapshot.data.roles.includes(this.connectedUser.role.libelle)) {
        return true;
      } else {
        this.router.navigate(['not-found']).then(() => {
          window.location.reload();
        });
        return;
      }
    } else { return true;}
  }

  compareFn(c1: T, c2: T): boolean {
    //@ts-ignore
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  public fixDouble(value): string {
    const x = +value;
    return x.toFixed(2);
  }

}
