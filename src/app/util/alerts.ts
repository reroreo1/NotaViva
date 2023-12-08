import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable()
export class Alerts {
    // for showing alert: 404:init, 200: success, 500: failure 
    statusCode = 404;

    //---------------------------------------------------------------
    //-- Show alert for succes / failure message. for add project
    //---------------------------------------------------------------
    showAlert(router: Router, statusCode: number) {
        window.scrollTo(0, 0);
        this.statusCode = statusCode;
        window.setTimeout(function () {
            // redirect to projects
            //router.navigate(['home']);
        }, 2000);
    }

    showAlertModal(modalType: string, statusCode: number, object) {
        object.getAll();
        // @ts-ignore
        $(modalType).modal("hide");
        this.statusCode = statusCode;
        window.setTimeout(function () {
            window.location.reload();
        }, 2000);
    }
}