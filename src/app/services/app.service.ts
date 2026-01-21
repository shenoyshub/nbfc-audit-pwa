import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompanyInfo } from '../state/company';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

    constructor(private http: HttpClient) {}

    openSideBar:boolean = false;

    getUserDetails() {

    }

    getCompanyDetails() {
        return this.http.get<CompanyInfo>(environment.API.apiBaseURL + environment.API.getCompanyDetails)
    }

    getActiveBankAccounts() {
      return this.http.get<any>(
        //   "https://localhost:5001/api/Loan/GetCreditBaseDocTypes",
        environment.API.apiBaseURL + environment.API.getActiveBankAccounts
      );
    }

    

  isGoogleApiEnabled() {
    return this.http.get<any>(
      environment.API.apiBaseURL + environment.API.isGoogleApiEnabled 
    );
  }

}