import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, last, lastValueFrom, Observable, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of'; 

import { AuthService } from './auth.service';



import { formatDate } from '@angular/common';
import { formatISO, isValid } from 'date-fns';
import { InitalDataService } from './intialdata.service';
import { UiStateService } from './ui-state.service';
import { environment } from '../../environments/environment';
import { BaseService } from './base.service';
import { ApplicationDetails, Customer, Dealer, DocumentResponse, Manufacturer, PaymentBreakup, RefreshTokenRespsonse, ReportParam, ReportPrintData, Reports, Scheme } from '../models/vehicleLoan';

export interface BankResposne {
  branchID: any;
  transactionID: any;
  data: any;
  totalCount: any;
}

const format = 'yyyy-MM-ddT00:00:00+05:30';

@Injectable({
  providedIn: 'root',
})
export class ApiService extends BaseService {

  // GetLedger(uniqueAccountNumber: string) {
  //   throw new Error('Method not implemented.');
  // }
  geoLocation: any;
  constructor(
    private http: HttpClient,
    private initalData: InitalDataService, private authService: AuthService,
    private uiStateService: UiStateService,

  ) {
    super();
  }
  login(username: string, password: string) {
    return this.http.post(
      environment.API.authBaseURL + environment.API.login,
      {
        username: username,
        password: password,
      },
      {
        params: {
          ReturnUrl:
            '/authorize/connect/authorize/callback?client_id=ibanking-client-1&redirect_uri=https://ibstaging.geovpl.in:51443/ui/signin-oidc&response_type=code&id_token&scope=openid profile Customer-Read Finance-Read GoldLoan-Read GroupLoan-Read Loan-Read Reports-Read NetBanking-Read Deposit-Read offline_access&response_mode=form_post&x-client-ver=5.2.0.0',
        },
      }
    );
  }

  getCurrentDate() {
    return formatDate(Date.now(), format, 'en_US');
  }

  // getVehloansByPage(
  //   branchId: number,
  //   page: number,
  //   pageSize: number = environment.paginationDefault,
  //   filter: any
  // ) {
  //   interface OptionalParams {
  //     UniqueAccountNumber: string | null;
  //     CustomerName?: string | null;
  //     StartDate?: string | null;
  //     EndDate?: string | null;
  //     BranchID?: number | null;
  //   }

  //   // var optional: OptionalParams = {
  //   //   //"UniqueAccountNumber": accNo,
  //   //   //CustomerName: customer,
  //   //   // StartDate?: start,
  //   //   // EndDate?: end,
  //   //   //BranchID: branchId,
  //   // }

  //   return this.http.get<BankResposne>(
  //     environment.API.apiBaseURL + environment.API.getLoans,
  //     {
  //       headers: {
  //         Module: this.uiStateService.selectedModuleCode,
  //       },
  //       params: {
  //         ModuleCode: this.uiStateService.selectedModuleCode,
  //         PageNumber: page,
  //         PageSize: pageSize,
  //         CustomerName: filter?.customerName || '',
  //         StartDate: isValid(filter?.issuedFrom)
  //           ? formatISO(filter.issuedFrom)
  //           : '',
  //         EndDate: isValid(filter?.issuedTo) ? formatISO(filter.issuedTo) : '',
  //         BranchID: filter?.branch || '',
  //         UniqueAccountNumber: filter?.uniqueAccountNumber || '',
  //       },
  //     }
  //   );
  // }

  getApplications(
    page: number,
    pageSize: number = environment.paginationDefault,
    filter?: any
  ) {
    return this.http.get<BankResposne>(
      environment.API.apiBaseURL + environment.API.getApplications,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          ModuleCode: this.uiStateService.selectedModuleCode,
          PageNumber: page,
          PageSize: pageSize,
          levelNumber: filter?.stage || '',
          CustomerName: filter?.customerName || '',
          BranchID: filter?.branch || '',
          Period: filter.period || 30,
          stateID: filter?.stateID || '',
          districtID: filter?.districtID || '',
          applicationNo: filter?.applnNo || '',
        },
      }
    );
  }

  getVehloanApplicationByPage(
    page: number,
    pageSize: number = environment.paginationDefault,
    applicationType: number,
    filter?: any
  ) {
    return this.http.get<BankResposne>(

      //'https://localhost:5001/api/v2.0/Loan/GetApplications',
      environment.API.apiBaseURL + environment.API.getApplications,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          ModuleCode: this.uiStateService.selectedModuleCode,
          PageNumber: page,
          PageSize: pageSize,
          levelNumber: applicationType == 7 ? '' : applicationType,
          CustomerName: filter?.customerName || '',
          BranchID: filter?.branch || '',
          Period: filter.period || 30,
          stateID: filter?.stateID || '',
          districtID: filter?.districtID || '',
          applicationNo: filter?.applnNo || '',
          myTasks: filter?.showMyTasks || false,
          scheme: filter?.schemeId || '',
          isFIPendingTabSelected: (applicationType == 7) ? true : false
        },
      }
    );
  }

  getApplicationDetails(applnID: string) {
    return this.http.get<ApplicationDetails>(
      // "https://localhost:5001/api/Loan/GetApplication",
      environment.API.apiBaseURL + environment.API.getLoanDetails,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          applnID: applnID,
          moduleCode: this.uiStateService.selectedModuleCode,
          _: +new Date(),
        },
      }
    );
  }

  getLoanReceipts(accNo: string, page: number, pageSize?: number) {
    return this.http.get<BankResposne>(
      environment.API.apiBaseURL + environment.API.getLoanReciepts,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          UniqueAccountNumber: accNo,
          PageNumber: page,
          PageSize: pageSize || environment.paginationDefault,
        },
      }
    );
  }








  getLoanReports(type: string) {
    return this.http.get<Reports[]>(
      environment.API.apiBaseURL + environment.API.getVehLoanReports,
      {
        params: {
          type: type,
        },
      }
    );
  }

  getAccountClosingDues(accNo: string, transDate: string) {
    return this.http.get(
      environment.API.apiBaseURL + environment.API.getAccClosingDues,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          uniqueAccountNumber: accNo,
          transDate: transDate,
        },
      }
    );
  }

  closeLoan(body: any) {
    return this.http.post(
      environment.API.apiBaseURL + environment.API.closeLoan,
      body,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
      }
    );
  }

  addDeduction(body: any) {
    return this.http.post(
      environment.API.apiBaseURL + environment.API.saveDiscount,
      body,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
      }
    );
  }

  approveOrRejectDeduction(body: any) {
    return this.http.post(
      environment.API.apiBaseURL + environment.API.approveOrRejectDiscount,
      body,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
      }
    );
  }

  getDeduction(accNo: string) {
    return this.http.get(
      environment.API.apiBaseURL + environment.API.getDiscount,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          uniqueAccountNumber: accNo,
        },
      }
    );
  }

  getLoanDiscountableItems(accNo: string, asOnDate: any) {
    return this.http.get(
      environment.API.apiBaseURL + environment.API.getLoanDiscountableItems,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          uniqueAccountNumber: accNo,
          asOnDate: asOnDate,
        },
      }
    );
  }

  getAllRecoveryStatus(accNo: string) {
    return this.http.get<any[]>(
      environment.API.apiBaseURL + environment.API.getRecoveryStatus,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          uniqueAccountNumber: accNo,
        },
      }
    );
  }

  getAllRecoverySteps() {
    return this.http.get<any[]>(
      environment.API.apiBaseURL + environment.API.getAllRecoverySteps,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
      }
    );
  }

  saveRecoveryState(body: any) {
    return this.http.post(
      environment.API.apiBaseURL + environment.API.saveRecoveryStatus,
      body,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
      }
    );
  }

  deleteRecoveryState(body: any) {
    return this.http.post(
      environment.API.apiBaseURL + environment.API.deleteLastRecoveryStatus,
      body,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
      }
    );
  }

  getReportParameters(id: number) {
    return this.http.get<ReportParam[]>(
      environment.API.apiBaseURL + environment.API.getReportParameters,
      {
        params: {
          id: id,
        },
      }
    );
  }

  getReportForId(id: number, filters: string) {
    return this.http.get<ReportPrintData>(
      environment.API.apiBaseURL + environment.API.getReportForId,
      {
        params: {
          id: id,
          filters: filters,
        },
      }
    );
  }

  getReportForId2(code: string, filters: string) {
    return this.http.get<any>(
      environment.API.apiBaseURL + environment.API.getReportForId2,
      {
        params: {
          code: code,
          filters: filters,
        },
      }
    );
  }

  exportReportById(id: number, filters: string) {
    return this.http.get(
      environment.API.apiBaseURL + environment.API.exportReportById,
      {
        params: {
          id: id,
          filters: filters,
        },
        responseType: 'blob',
      }
    );
  }

  getSchemeList(vehicleType: any) {
    return this.http.get<Scheme[]>(
      environment.API.apiBaseURL + environment.API.getAchiveSchemeList,
      //'https://localhost:44340/api/LoanScheme/GetActiveLoanSchemes',
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          moduleCode: this.uiStateService.selectedModuleCode,
          vehicleType: vehicleType ?? ''
        },
      }
    );
  }

  getManufacturersList() {
    return this.http.get<Manufacturer[]>(
      environment.API.apiBaseURL + environment.API.getManufacturersList,
      {
        headers: {
          Module: 'VEH',
        },
      }
    );
  }

  GetManufacturersByVehicleType(vehicleTypeID: any) {
    return this.http.get<Manufacturer[]>(
      environment.API.apiBaseURL +
      environment.API.GetManufacturersByVehicleType,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          vehicleTypeID,
        },
      }
    );
  }

  getManufacturersByScheme(scheme: any) {
    return this.http.get<Manufacturer[]>(
      environment.API.apiBaseURL + environment.API.getManufacturersByScheme,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          scheme: scheme,
        },
      }
    );
  }

  getVehicleTypes() {
    return this.http.get<any[]>(
      environment.API.apiBaseURL + environment.API.getVehicleTypes,
      {
        headers: {
          Module: 'VEH',
        },
      }
    );
  }

  getDealersList() {
    return this.http.get<Dealer[]>(
      environment.API.apiBaseURL + environment.API.getDealersList,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
      }
    );
  }

  getModels(manufacturerID: number) {
    return this.http.get<Dealer[]>(
      environment.API.apiBaseURL + environment.API.getModelsList,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          manufacturerId: manufacturerID,
        },
      }
    );
  }

  getDealerBranches(dealerId: number) {
    return this.http.get<Dealer[]>(
      environment.API.apiBaseURL + environment.API.getDealerBranches,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          dealerId: dealerId,
        },
      }
    );
  }

  getFuelTypes(modelId: number) {
    return this.http.get<Dealer[]>(
      environment.API.apiBaseURL + environment.API.getFuelTypes,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          modelId: modelId,
        },
      }
    );
  }

  getVariant(modelId: number) {
    return this.http.get<Dealer[]>(
      environment.API.apiBaseURL + environment.API.getVariant,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          modelId: modelId,
        },
      }
    );
  }

  getApplicationFeesByScheme(code: string, amount: number) {
    return this.http.get<Dealer[]>(

      // "https://localhost:44340/api/LoanScheme/GetApplicationFeesWithTaxes",
      environment.API.apiBaseURL + environment.API.getApplicationFeesByScheme,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          code: code,
          amount: amount,
        },
      }
    );
  }

  getApplicationFeesByLoanAppNum(applnID: string) {
    return this.http.get<Dealer[]>(
      //   "https://localhost:44340/api/Loan/GetApplicationFeesByLoanAppNumber",
      environment.API.apiBaseURL +
      environment.API.getApplicationFeesByLoanAppNum,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          applnID: applnID,
        },
      }
    );
  }

  getApplicationFees(code: string) {
    return this.http.get<Dealer[]>(
      environment.API.apiBaseURL + environment.API.getApplicationFees,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          code: code,
        },
      }
    );
  }

  getInterestRate(code: string, transDate: string) {
    return this.http.get<Dealer[]>(
      environment.API.apiBaseURL + environment.API.getInterestRate,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          loanType: code,
          transDate: transDate,
        },
      }
    );
  }

  getActualAndFlatInterestRate(
    code: string,
    transDate: string,
    loanAmount: number,
    numberOfInstallments: number,
    flatRateMain: any,
    flatRateOther: any) {
    return this.http.get<any>(
      environment.API.apiBaseURL + environment.API.getActualAndFlatInterestRate,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          loanType: code,
          transDate: transDate,
          loanAmount: loanAmount,
          numberOfInstallments: numberOfInstallments,
          flatRateMain: flatRateMain,
          flatRateOther: flatRateOther
        },
      }
    );
  }

  getInterestRates(code: string, transDate: string) {
    return this.http.get<Dealer[]>(
      //"https://localhost:44340/api/LoanScheme/GetInterestRates",
      environment.API.apiBaseURL + environment.API.getInterestRates,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          loanType: code,
          transDate: transDate,
        },
      }
    );
  }

  getEquatedInstallmentInfo(
    loanType: string,
    installmentCount: number,
    interestRate: number,
    startDate: string,
    amount: number
  ) {
    return this.http.get<any>(
      environment.API.apiBaseURL + environment.API.getEquatedInstallmentInfo,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          LoanType: loanType,
          InstallmentCount: installmentCount,
          InterestRate: interestRate,
          StartDate: startDate,
          Amount: amount,
        },
      }
    );
  }

  getLoanSchedules(
    loanType: string,
    installmentCount: number,
    interestRate: number,
    startDate: string,
    amount: number,
    interestRateMain: number,
    interestRateOther: number
  ) {
    return this.http.get<any>(
      environment.API.apiBaseURL + environment.API.getLoanSchedules,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          LoanType: loanType,
          InstallmentCount: installmentCount,
          InterestRate: interestRate,
          InterestRateMain: interestRateMain,
          InterestRateOther: interestRateOther,
          StartDate: startDate,
          Amount: amount,
        },
      }
    );
  }

  getAttachmentTypes(code: string) {
    return this.http.get<Dealer[]>(
      environment.API.apiBaseURL + environment.API.getAttachmentTypes,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          code: code,
        },
      }
    );
  }

  getRefreshToken() {
    return this.http.get<RefreshTokenRespsonse>(
      `
    https://isectesting.icrats.in/ui-v2/Account/GetRefreshToken`,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
      }
    );
  }

  getInstDues(accNo: string, instNo: number) {
    return this.http.get<PaymentBreakup>(
      environment.API.apiBaseURL + environment.API.getInstDues,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          uniqueAccountNumber: accNo,
          installmentNumber: instNo,
          transDate: this.getCurrentDate(),
        },
      }
    );
  }

  getCustomerSearch(searchText: any, pendingApproval: boolean = false) {
    return this.http.get<Customer[]>(
     // "https://localhost:44356/api/v2.0/Customer/GetCustomers",
       environment.API.apiBaseURL + environment.API.getCustomers,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          key: searchText,
          pendingApproval: pendingApproval,
        },
      }
    );
  }

  getPagedSchemes(page: number, pageSize: number, name: string, isActive: any) {
    return this.http.get<BankResposne>(
      environment.API.apiBaseURL + environment.API.getLoansSchemes,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          PageNumber: page,
          PageSize: pageSize,
          ModuleCode: this.uiStateService.selectedModuleCode,
          name: name,
          isActive: isActive == 2 ? '' : isActive,
        },
      }
    );
  }

  getKYCDocuments() {
    return this.http.get<DocumentResponse[]>(
      environment.API.apiBaseURL + environment.API.getKYCDocuments,
      {}
    );
  }

  searchLoanByTextWithPagination(
    branchId: any,
    text: string,
    pageNumber: any,
    pageSize: any,
    stateID: any,
    districtID: any,
    applnNo: any,
    schemeId: any
  ) {
    return this.http.get<BankResposne>(
      //  'https://localhost:5001/api/v2.0/Loan/CommonSearch',
      environment.API.apiBaseURL + environment.API.getLedgers,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          BrID: branchId ?? '',
          Text: text,
          ModuleCode: this.uiStateService.selectedModuleCode,
          PageNumber: pageNumber,
          PageSize: pageSize,
          stateID: stateID,
          districtID: districtID,
          applicationNo: applnNo || '',
          scheme: schemeId ?? ''
        },
      }
    );
  }

  searchLoanByText(text: string) {
    return this.http.get<BankResposne>(
      environment.API.apiBaseURL + environment.API.getCustomSearchText,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          Text: text,
          ModuleCode: this.uiStateService.selectedModuleCode,
          PageNumber: 1,
          PageSize: 10,
        },
      }
    );
  }

  getLoanPledgeConfig(loanType: string, asOnDate: string) {
    return this.http.get(
      environment.API.apiBaseURL + environment.API.getLoanPledgeConfig,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          code: loanType,
          asOnDate: asOnDate,
        },
      }
    );
  }

  get(queryParams: Object, path: string) {
    const req = new HttpRequest('GET', path, queryParams, {
      reportProgress: true,
    });
  }

  post(body: Object, path: string) {
    const req = new HttpRequest('POST', path, body, {
      reportProgress: true,
    });
  }

  upload(file: File) {
    if (!file) {
      return of<string>();
    }

    // COULD HAVE WRITTEN:
    // return this.http.post('/upload/file', file, {
    //   reportProgress: true,
    //   observe: 'events'
    // }).pipe(

    // Create the request object that POSTs the file to an upload endpoint.
    // The `reportProgress` option tells HttpClient to listen and return
    // XHR progress events.
    const req = new HttpRequest('POST', '/upload/file', file, {
      reportProgress: true,
    });

    // The `HttpClient.request` API produces a raw event stream
    // which includes start (sent), progress, and response events.
    return this.http.request(req).pipe(
      map((event) => this.getEventMessage(event, file)),
      tap((message) => this.showProgress(message)),
      last(), // return last (completed) message to caller
      catchError(this.handleError(file))
    );
  }

  /** Return distinct message for sent, upload progress, & response events */
  private getEventMessage(event: HttpEvent<any>, file: File) {
    switch (event.type) {
      case HttpEventType.Sent:
        return `Uploading file "${file.name}" of size ${file.size}.`;

      case HttpEventType.UploadProgress:
        // Compute and show the % done:
        const percentDone = event.total
          ? Math.round((100 * event.loaded) / event.total)
          : 0;
        return `File "${file.name}" is ${percentDone}% uploaded.`;

      case HttpEventType.Response:
        return `File "${file.name}" was completely uploaded!`;

      default:
        return `File "${file.name}" surprising upload event: ${event.type}.`;
    }
  }

  /**
   * Returns a function that handles Http upload failures.
   *
   * @param file - File object for file being uploaded
   *
   * When no `UploadInterceptor` and no server,
   * you'll end up here in the error handler.
   */
  private handleError(file: File) {
    const userMessage = `${file.name} upload failed.`;

    return (error: HttpErrorResponse) => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      const message =
        error.error instanceof Error
          ? error.error.message
          : `server returned code ${error.status} with body "${error.error}"`;

      //this.messenger.add(`${userMessage} ${message}`);

      // Let app keep running but indicate failure.
      return of(userMessage);
    };
  }

  private showProgress(message: string) {
    //this.messenger.add(message);
  }

  createLoanApplication(postData: any, uniqueId: any): Observable<any> {
    return this.http.post(

      //  "https://localhost:44340/api/Loan/SaveApplication",
      `${environment.API.apiBaseURL}${environment.API.createVehApplication}`,
      postData,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
          UniqueID: uniqueId,
        },
      }
    );
  }

  submitTvrCheck(data: any): Observable<any> {
    return this.http.post(
      //  "https://localhost:44340/api/Loan/SaveVarificationDetails",
      `${environment.API.apiBaseURL}${environment.API.submitTvrCheck}`,
      data,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
      }
    );
  }

  getApprovalInfo(applicationId: number): Observable<any> {
    return this.http.get<DocumentResponse[]>(
      environment.API.apiBaseURL + environment.API.getApprovalInfo,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          moduleCode: this.uiStateService.selectedModuleCode,
          applnID: applicationId,
        },
      }
    );
  }

  getDisbursementInfo(applicationId: number): Observable<any> {
    return this.http.get<DocumentResponse[]>(
      environment.API.apiBaseURL + environment.API.GetDisbursementInfo,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          applicationID: applicationId,
        },
      }
    );
  }

  sendVEHLoanApproval(reqData: any): Observable<any> {
    reqData.ModuleCode = this.uiStateService.selectedModuleCode;
    return this.http.post(
      //"https://localhost:44340/api/Loan/SaveApprovalDetails",
      `${environment.API.apiBaseURL}${environment.API.SaveApprovalDetails}`,
      reqData,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
      }
    );
  }

  getFileById(id: string): Observable<any> {
    return this.http.get(
      // `https://localhost:44356/api/General/GetFileByID/?uniqueID=${id}`,
      `${environment.API.apiBaseURL}${environment.API.getFileById}?uniqueID=${id}`,
      { responseType: 'blob' }
    );
  }

  updateLoanApplication(data: any): Observable<any> {
    return this.http.post(
      // "https://localhost:44340/api/Loan/UpdateApplication",
      `${environment.API.apiBaseURL}${environment.API.updateLoanApplication}`,
      data,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
      }
    );
  }

  saveReceipt(reqData: any): Observable<any> {
    return this.http.post(
      `${environment.API.apiBaseURL}${environment.API.saveReceipt}`,
      reqData,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
      }
    );
  }

  getAttachments(applicationId: any): Observable<any> {
    return this.http.get<DocumentResponse[]>(
      // 'https://localhost:5001/api/Loan/GetLoanAttachments',
      environment.API.apiBaseURL + environment.API.getAttachements,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          applnID: applicationId,
        },
      }
    );
  }

  saveLoanAttachment(postData: any): Observable<any> {
    return this.http.post(
      `${environment.API.apiBaseURL}${environment.API.saveAttachment}`,
      postData,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
      }
    );
  }

  getAppliedApplicationFees(applicationNo: number): Observable<any> {
    return this.http.get(
      `${environment.API.apiBaseURL}${environment.API.getAppliedLoanFees}`,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          applnID: applicationNo,
          moduleCode: this.uiStateService.selectedModuleCode,
        },
      }
    );
  }

  saveApplicationAppliedLoanFees(postData: any): Observable<any> {
    return this.http.post(
      `${environment.API.apiBaseURL}${environment.API.saveApplicationAppliedLoanFees}`,
      postData,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
      }
    );
  }

  getFeeRecepit(transID: any, branch: any): Observable<any> {
    return this.http.get(
      `${environment.API.apiBaseURL}${environment.API.PrintVoucher2}`,
      {
        params: {
          transID,
          branch,
        },
        responseType: 'blob',
      }
    );
  }

  updateDraftLoanApplication(applicationDetails: any): Observable<any> {
    return this.http.post(
      //  "https://localhost:44340/api/Loan/UpdateApplication",
      `${environment.API.apiBaseURL}${environment.API.updateLoanApplication}`,
      applicationDetails,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
      }
    );
  }

  getLoanPaySchedule(accNo: string) {
    return this.http.get<any>(
      environment.API.apiBaseURL + environment.API.getLoanPaySchedule,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          UniqueAccountNumber: accNo,
        },
      }
    );
  }
  verifyLoanApplication(body: any): Observable<any> {
    return this.http.post<any[]>(
      //"https://localhost:5001/api/Loan/SaveVarificationDetails",
      environment.API.apiBaseURL + environment.API.verification,
      body,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
      }
    );
  }

  saveCreditVerification(body: any): Observable<any> {
    return this.http.post(
      environment.API.apiBaseURL + environment.API.saveCreditVerification,
      body,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
      }
    );
  }

  GetLoanSchemeByName(code: string) {
    return this.http.get<any>(
      // 'https://localhost:44340/api/LoanScheme/GetLoanSchemeByName',
      environment.API.apiBaseURL + environment.API.GetLoanSchemeByName,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          name: code,
        },
      }
    );
  }

  GetCibilAccountTypes() {
    return this.http.get<any>(
      environment.API.apiBaseURL + environment.API.GetCibilAccountTypes,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
      }
    );
  }

  saveLoanScheme(reqData: any): Observable<any> {
    return this.http.post(
      // 'https://localhost:44340/api/LoanScheme/SaveLoanScheme',
      `${environment.API.apiBaseURL}${environment.API.saveLoanScheme}`,
      reqData,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
      }
    );
  }
  GetLoanAttachmentTypes() {
    return this.http.get<any>(
      environment.API.apiBaseURL +
      environment.API.GetLoanAttachmentTypes +
      `?moduleCode=${this.uiStateService.selectedModuleCode}`,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
      }
    );
  }

  GetLoanModule() {
    return this.http.get<any>(
      environment.API.apiBaseURL +
      environment.API.getLoanModule +
      `?code=${this.uiStateService.selectedModuleCode}`,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
      }
    );
  }
  GetAccountHeads(code: string = '') {
    return this.http.get<any>(
      environment.API.apiBaseURL + environment.API.GetAccountHeads,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          key: code,
        },
      }
    );
  }

  GetAccountHeadByID(headId: number) {
    return this.http.get<any>(
      environment.API.apiBaseURL + environment.API.getAccountHeadByID,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          headId: headId,
        },
      }
    );
  }

  getTaxes(headId: number, amount: number): Observable<any> {
    return this.http.get(
      `${environment.API.apiBaseURL}${environment.API.GetTaxes}`,
      {
        params: {
          headId: headId,
          amount: amount,
          _: +new Date(),
        },
      }
    );
  }

  calculateDefaultChargeTaxes(uniqueAccountNumber: any, dueDate: any, transDate: any, amount: number): Observable<any> {
    return this.http.get(
      `${environment.API.apiBaseURL}${environment.API.calculateDefaultChargeTaxes}`,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          uniqueAccountNumber: uniqueAccountNumber,
          dueDate: dueDate,
          transDate: transDate,
          amount: amount
        },
      }
    );
  }

  calculatePenalTaxes(uniqueAccountNumber: any, dueDate: any, transDate: any, amount: number): Observable<any> {
    return this.http.get(
      `${environment.API.apiBaseURL}${environment.API.calculatePenalTaxes}`,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          uniqueAccountNumber: uniqueAccountNumber,
          dueDate: dueDate,
          transDate: transDate,
          amount: amount
        },
      }
    );
  }

  async getTaxList(headId: number, amount: number) {
    try {
      return await lastValueFrom(
        this.http.get(
          `${environment.API.apiBaseURL}${environment.API.GetTaxes}`,
          {
            params: {
              headId: headId,
              amount: amount,
              _: +new Date(),
            },
          }
        )
      );
    } catch (e) {
      return null;
    }
  }

  revertLoanApplication(reqBody: any): Observable<any> {
    return this.http.post(
      //'https://localhost:44340/api/Loan/DeleteLoanApplication',
      `${environment.API.apiBaseURL}${environment.API.DeleteLoanApplication}`,
      reqBody,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
      }
    );
  }

  getInstallmentWiseDue(
    accNo: string,
    dueDate: string,
    transDate: string
  ): Observable<any> {
    return this.http.get(
      `${environment.API.apiBaseURL}${environment.API.GetInstallmentWiseDue}`,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          uniqueAccountNumber: accNo,
          transDate: transDate,
          dueDate: dueDate,
          _: +new Date(),
        },
      }
    );
  }

  getOtherCharges(accNo: string, transDate: string): Observable<any> {
    return this.http.get(
      `${environment.API.apiBaseURL}${environment.API.GetOtherChargeDueWithTax}`,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          uniqueAccountNumber: accNo,
          transDate: transDate,
          _: +new Date(),
        },
      }
    );
  }

  getOtherChargesAndDiscounts(
    accNo: string,
    transDate: string
  ): Observable<any> {
    return this.http.get(
      `${environment.API.apiBaseURL}${environment.API.GetOtherChargeDueWithTaxAndDiscount}`,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          uniqueAccountNumber: accNo,
          transDate: transDate,
          _: +new Date(),
        },
      }
    );
  }

  getOtherChargesList(otherChargeId: any, brId: any): Observable<any> {
    return this.http.get<any>(
      environment.API.apiBaseURL + environment.API.GetOtherCharges,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          otherChargeId: otherChargeId,
          brId: brId,
        },
      }
    );
  }

  addOtherChargesList(postData: any): Observable<any> {
    return this.http.post<any>(
      environment.API.apiBaseURL + environment.API.AddOtherChargesList,
      postData,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
      }
    );
  }

  getAccountHeads(params: any): Observable<any> {
    return this.http.get<any>(
      environment.API.apiBaseURL + environment.API.GetAccountHeads,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          ...params,
          _: +new Date(),
        },
      }
    );
  }

  getSubAccounts(params: any): Observable<any> {
    return this.http.get<any>(
      environment.API.apiBaseURL + environment.API.getSubAccounts,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          ...params,
          _: +new Date(),
        },
      }
    );
  }

  deleteOtherCharges(body: any): Observable<any> {
    return this.http.delete<any>(
      environment.API.apiBaseURL + environment.API.DeleteOtherCharge,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        body: {
          ...body,
        },
      }
    );
  }

  addVehicleDetails(postBody: any): Observable<any> {
    return this.http.post<any>(
      environment.API.apiBaseURL + environment.API.AddVehicleDetails,
      postBody,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
      }
    );
  }



  deleteReceipt(postBody: any): Observable<any> {
    return this.http.post<any>(
      environment.API.apiBaseURL + environment.API.DeleteReceipt,
      {
        ...postBody,
        ModuleCode: this.uiStateService.selectedModuleCode,
      },
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
      }
    );
  }

  GetInstallmentTranHistory(
    transactionID: string,
    branchId: number,
    uniqueAccountNumber: string
  ): Observable<any> {
    return this.http.get<any>(
      environment.API.apiBaseURL + environment.API.GetInstallmentTranHistory,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          TransactionID: transactionID,
          BranchID: branchId,
          UniqueAccountNumber: uniqueAccountNumber,
        },
      }
    );
  }

  deleteLoanLedger(reqBody: any): Observable<any> {
    return this.http.post(
      `${environment.API.apiBaseURL}${environment.API.deleteLoanLedger}`,
      reqBody,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
      }
    );
  }

  getItemModels(
    page: number,
    pageSize: number,
    seatchText: string,
    manufacturerType: string
  ) {
    return this.http.get<any>(
      environment.API.apiBaseURL + environment.API.getModelsByManufacturerType,
      {
        headers: {
          Module: 'VEH',
        },
        params: {
          pageNumber: page,
          pageSize: pageSize,
          searchText: seatchText,
          manufacturerType: manufacturerType,
        },
      }
    );
  }

  getItemModel(id: number) {
    return this.http.get<any>(
      // "https://localhost:44340/api/Vechicle/GetItemModel",
      environment.API.apiBaseURL + environment.API.getItemModel,
      {
        headers: {
          Module: 'VEH',
        },
        params: {
          id: id,
        },
      }
    );
  }

  getDealer(dealerId: number) {
    return this.http.get<any>(
      environment.API.apiBaseURL + environment.API.getDealer,
      {
        headers: {
          Module: 'VEH',
        },
        params: {
          id: dealerId,
        },
      }
    );
  }

  saveItemModel(postData: any): Observable<any> {
    return this.http.post(
      // "https://localhost:44340/api/Vechicle/SaveItemModel",
      `${environment.API.apiBaseURL}${environment.API.saveItemModel}`,
      postData,
      {
        headers: {
          Module: 'VEH',
        },
      }
    );
  }

  saveDealer(postData: any): Observable<any> {
    return this.http.post(
      `${environment.API.apiBaseURL}${environment.API.saveDealer}`,
      postData,
      {
        headers: {
          Module: 'VEH',
        },
      }
    );
  }

  getPagedDealers(page: number, pageSize: number, searchText: string) {
    return this.http.get<any>(
      environment.API.apiBaseURL + environment.API.getPagedDealers,
      {
        headers: {
          Module: 'VEH',
        },
        params: {
          pageNumber: page,
          pageSize: pageSize,
          searchText: searchText,
        },
      }
    );
  }

  getLoanConfiguration(code: string) {
    return this.http.get<any>(
      // 'https://localhost:44340/api/LoanScheme/GetLoanConfiguration',
      environment.API.apiBaseURL + environment.API.getLoanConfiguration,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          code: code,
        },
      }
    );
  }

  getLoanSettings(moduleCode: any) {
    return this.http.get<any>(
      environment.API.apiBaseURL + environment.API.getLoanSettings,
      {
        headers: {
          Module: moduleCode,
        },
      }
    );
  }

  GetOrnamentList(filter: string) {
    return this.http.get<string[]>(
      environment.API.apiBaseURL + environment.API.getOrnamentList,
      {
        headers: { Module: this.uiStateService.selectedModuleCode, },
        params: {
          filter: filter,
        },
      }
    );
  }

  unlockApplication(applnID: any) {
    return this.http.post(
      // "https://localhost:44340/api/Loan/UnlockApplication",
      environment.API.apiBaseURL + environment.API.unlockApplication,
      {
        applicationNo: applnID,
      }
    );
  }

  lockApplication(applnID: any) {
    return this.http.post(
      // "https://localhost:44340/api/Loan/LockApplication",
      environment.API.apiBaseURL + environment.API.lockApplication,
      {
        applicationNo: applnID,
      }
    );
  }

  getApplicationStageLogsByID(applicationId: number): Observable<any> {
    return this.http.get<DocumentResponse[]>(
      environment.API.apiBaseURL + environment.API.GetApplicationStageLogsByID,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          applicationID: applicationId,
        },
      }
    );
  }

  getLoanDisbursementDetails(uniqueAccountNumber: string): Observable<any> {
    return this.http.get<DocumentResponse[]>(
      //"https://localhost:5001/api/Loan/GetLoanDisbursementDetails",
      environment.API.apiBaseURL + environment.API.GetLoanDisbursementDetails,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          uniqueAccountNumber: uniqueAccountNumber,
        },
      }
    );
  }

  GetHouseTypes(branchID: number): Observable<any> {
    return this.http.get<DocumentResponse[]>(
      environment.API.apiBaseURL + environment.API.GetHouseTypes,
      {
        params: {},
      }
    );
  }

  GetHouseRoofTypes(branchID: number): Observable<any> {
    return this.http.get<DocumentResponse[]>(
      environment.API.apiBaseURL + environment.API.GetHouseRoofTypes,
      {
        params: {},
      }
    );
  }

  CustomerPreCheckValidation(body: any) {
    return this.http.post(
      environment.API.apiBaseURL + environment.API.CustomerPreCheckValidation,
      body
    );
  }

  CreatePrecheckDeviationRequest(body: any) {
    return this.http.post(
      environment.API.apiBaseURL + environment.API.CreatePrecheckDeviationRequest,
      body
    );
  }

  getVehicleTypesByManufacturer(manufacturerID: number) {
    return this.http.get<Dealer[]>(
      environment.API.apiBaseURL +
      environment.API.getVehicleTypesByManufacturer,
      {
        headers: {
          Module: 'VEH',
        },
        params: {
          manufacturerId: manufacturerID,
        },
      }
    );
  }

  getCreditBaseTypes() {
    return this.http.get<any>(
      environment.API.apiBaseURL + environment.API.getCreditBaseTypes
    );
  }

  getCreditBaseDocTypes(creditBaseTypeId: any) {
    return this.http.get<any>(
      //   "https://localhost:5001/api/Loan/GetCreditBaseDocTypes",
      environment.API.apiBaseURL + environment.API.getCreditBaseDocTypes,
      {
        params: {
          creditBaseTypeId: creditBaseTypeId,
        },
      }
    );
  }

  getTDAccountDetails(accNo: any) {
    return this.http.get<any>(
      environment.API.apiBaseURL + environment.API.getTDAccountDetails,
      //'https://localhost:44360/api/Deposit/GetTDAccountDetails',
      {
        params: {
          UniqueAccountNumber: accNo,
        },
      }
    );
  }

  getDepositHolders(accNo: any) {
    return this.http.get<any>(
      environment.API.apiBaseURL + environment.API.getDepositHolders,
      {
        params: {
          UniqueAccountNumber: accNo,
        },
      }
    );
  }

  updateTDEffectiveDate(body: any) {
    return this.http.post(
      environment.API.apiBaseURL + environment.API.updateTDEffectiveDate,
      body
    );
  }

  updateDepositModeOfOperation(body: any) {
    return this.http.post(
      environment.API.apiBaseURL + environment.API.updateDepositModeOfOperation,
      body
    );
  }

  AddDepositor(body: any) {
    return this.http.post(
      environment.API.apiBaseURL + environment.API.addDepositor,
      body
    );
  }

  getVehicleLoanHistory(registrationNumber: any, applnID: any) {
    return this.http.get<any>(
      //"https://localhost:5001/api/Loan/GetVehicleLoanHistory",
      environment.API.apiBaseURL + environment.API.getVehicleLoanHistory,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          registrationNumber: registrationNumber,
          applnID: applnID > 0 ? applnID : 0,
        },
      }
    );
  }

  AddDepositApplicant(body: any) {
    return this.http.post(
      //'https://localhost:44360/api/Deposit/AddAdditionalApplicant',
      environment.API.apiBaseURL + environment.API.addAdditionalApplicant,
      body
    );
  }

  getDepositApplicationInfo(applicationNo: any, depositType: any) {
    return this.http.get<any>(
      // 'https://localhost:44360/api/Deposit/GetApplicationInfo',
      environment.API.apiBaseURL + environment.API.getApplicationInfo,
      {
        params: {
          applicationNo: applicationNo,
          depositType: depositType,
        },
      }
    );
  }

  saveManufacturer(postData: any): Observable<any> {
    return this.http.post(
      //'https://localhost:5001/api/Vechicle/SaveManufacturer',
      `${environment.API.apiBaseURL}${environment.API.saveManufacturer}`,
      postData,
      {
        headers: {
          Module: 'VEH',
        },
      }
    );
  }

  getPagedManufacturers(page: number, pageSize: number, searchText: string) {
    return this.http.get<any>(
      //'https://localhost:5001/api/Vechicle/GetPagedManufacturers',
      environment.API.apiBaseURL + environment.API.getManufacturers,
      {
        headers: {
          Module: 'VEH',
        },
        params: {
          pageNumber: page,
          pageSize: pageSize,
          searchText: searchText,
        },
      }
    );
  }

  getManufacturer(manufacturerId: number) {
    return this.http.get<any>(
      // 'https://localhost:5001/api/Vechicle/GetManufacturer',
      environment.API.apiBaseURL + environment.API.getManufacturer,
      {
        headers: {
          Module: 'VEH',
        },
        params: {
          id: manufacturerId,
        },
      }
    );
  }

  getTATransAccountDetails(accNo: any, tranId: any, tranDate: any) {
    return this.http.get<any>(
      environment.API.apiBaseURL + environment.API.getTATransAccountDetails,
      // 'https://localhost:44360/api/Deposit/GetTAAccountTransactionDetails',
      {
        params: {
          UniqueAccountNumber: accNo,
          TranId: tranId,
          TranDate: tranDate,
        },
      }
    );
  }
  sbUnlockTransaction(body: any) {
    return this.http.post(
      //  'https://localhost:44360/api/Deposit/SBUnlockTransaction',
      environment.API.apiBaseURL + environment.API.sbUnlockTransaction,
      body
    );
  }

  getAllDepositSchemes() {
    return this.http.get<any>(
      // 'https://localhost:44360/api/DepositScheme/GetAllDepositSchemes',
      environment.API.apiBaseURL + environment.API.GetAllDepositSchemes
    );
  } 


  getGeolocationDescription(long: string, lati: string) {
    return this.http.get<any>(
      environment.API.apiBaseURL + environment.API.GetGeolocationDescription,
      {
        params: {
          longitude: long,
          latitude: lati,
        },
      }
    );
  }

  IsValidTransactionalAccount(
    isDeposit: boolean,
    customerID: any,
    uniqueNumber: any
  ) {
    return this.http.get<any>(
      environment.API.apiBaseURL + environment.API.isValidTransactionalAccount,
      {
        params: {
          uniqueNumber: uniqueNumber,
          customerID: customerID,
          isDeposit: isDeposit,
        },
      }
    );
  }

  getTransactionalAccounts(isDeposit: boolean, customerID: any) {
    return this.http.get<any>(
      environment.API.apiBaseURL + environment.API.getTransactionalAccounts,
      {
        params: {
          isDeposit: isDeposit,
          customerID: customerID,
        },
      }
    );
  }

  rejectLoanAppln(reqData: any): Observable<any> {
    reqData.ModuleCode = this.uiStateService.selectedModuleCode;
    return this.http.post(
      // 'https://localhost:44340/api/Loan/RejectApplication',
      `${environment.API.apiBaseURL}${environment.API.rejectApplication}`,
      reqData,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
      }
    );
  }

  GetModelsByManufacturerVehicleType(
    manufacturerID: number,
    vehicleTypeID: any
  ) {
    return this.http.get<Dealer[]>(
      // "https://localhost:44340/api/Vechicle/GetModelsByManufacturerVehicleType",
      environment.API.apiBaseURL +
      environment.API.getModelsByManufacturerVehicleType,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          manufacturerId: manufacturerID,
          vehicleTypeID: vehicleTypeID > 0 ? vehicleTypeID : '',
        },
      }
    );
  }

  GetInstallmentWiseDueWithTaxAndDiscount(
    accNo: string,
    dueDate: string,
    transDate: string
  ): Observable<any> {
    return this.http.get(
      `${environment.API.apiBaseURL}${environment.API.GetInstallmentWiseDueWithTaxAndDiscount}`,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          uniqueAccountNumber: accNo,
          transDate: transDate,
          dueDate: dueDate,
        },
      }
    );
  }

  deleteLoanAttachment(reqBody: any): Observable<any> {
    return this.http.post(
      //  "https://localhost:5001/api/Loan/DeleteLoanAttachment",
      `${environment.API.apiBaseURL}${environment.API.DeleteLoanAttachment}`,
      reqBody,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
      }
    );
  }

  ChangeLoanSchedules(postData: any): Observable<any> {
    return this.http.post(
      //      "https://localhost:5001/api/Loan/ChangeLoanSchedules",
      environment.API.apiBaseURL + environment.API.ChangeLoanSchedules,
      postData
    );
  }

  GetLoanSchemeBranches(code: string) {
    return this.http.get<any>(
      // 'https://localhost:5001/api/LoanScheme/GetLoanSchemeBranches',
      environment.API.apiBaseURL + environment.API.GetLoanSchemeBranches,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          loanType: code,
        },
      }
    );
  }

  GetReceiptStaticQRCodeString(
    uniqueAccountNumber: string,
    loanType: string,
    moduleCode: string
  ) {
    return this.http.get<any>(
      //'https://localhost:44331/api/QRCodePay/GetStaticQRCode',
      environment.API.apiBaseURL + environment.API.GetReceiptStaticQRCodeString,
      {
        params: {
          uniqueAccountNumber: uniqueAccountNumber,
          loanType: loanType,
          moduleCode: moduleCode,
        },
      }
    );
  }

  GetAllBranchContact() {
    return this.http.get<ApplicationDetails>(
      environment.API.apiBaseURL + environment.API.getAllbranchContacts,
      {
        params: {},
      }
    );
  }

  savePostOffice(postData: any): Observable<any> {
    return this.http.post(
      //'https://localhost:44324/api/General/SavePostOffice',
      `${environment.API.apiBaseURL}${environment.API.savePostOffice}`,
      postData,
      {}
    );
  }

  getPagedPostOffices(page: number, pageSize: number, searchText: string) {
    return this.http.get<any>(
      //'https://localhost:44324/api/General/GetPagedPostOffices',
      environment.API.apiBaseURL + environment.API.getPagedPostOffices,
      {
        params: {
          pageNumber: page,
          pageSize: pageSize,
          searchText: searchText,
        },
      }
    );
  }

  getPostOffice(postOfficeId: number) {
    return this.http.get<any>(
      // 'https://localhost:44324/api/General/GetPostOffice',
      environment.API.apiBaseURL + environment.API.getPostOffice,
      {
        params: {
          id: postOfficeId,
        },
      }
    );
  }

  createGrouploanApplication(body: any) {
    return this.http.post(
      environment.API.apiBaseURL + environment.API.SaveGrouploanApplication,
      body,
      {}
    );
  }

  // getGrouploanApplicationDetails(
  //   page: number,
  //   pageSize: number = environment.paginationDefault,
  //   branchId: number,
  //   GroupName: any,
  //   filter?: any,

  // ) {
  //   return this.http.get<ApplicationDetails>(
  //     //  "https://localhost:44340/api/Loan/GetApplication",
  //     environment.API.apiBaseURL + environment.API.getGrouploanApplicationDetails,
  //     {
  //       params: {
  //         PageNumber: page,
  //         PageSize: pageSize,
  //         GroupName: GroupName,
  //         Period: filter.period || 30,
  //         BranchID: branchId,
  //         MyBranchesOnly: true
  //       },
  //     }
  //   );
  // }

  getGrouploanApplicationDetails(applnID: string) {
    return this.http.get<ApplicationDetails>(
      //  "https://localhost:44340/api/Loan/GetApplication",
      environment.API.apiBaseURL +
      environment.API.getGrouploanApplicationDetails,
      {
        params: {
          applicationID: applnID,
          _: +new Date(),
        },
      }
    );
  }

  updateDraftGroupLoanApplication(applicationDetails: any): Observable<any> {
    return this.http.post(
      //"https://localhost:44340/api/Loan/UpdateApplication",
      `${environment.API.apiBaseURL}${environment.API.updateGroupLoanApplication}`,
      applicationDetails,
      {}
    );
  }



  bulkImportReceiptTransactions(postData: any): Observable<any> {
    return this.http.post(
      //"https://localhost:5001/api/Loan/BulkImportReceiptTransactions",
      environment.API.apiBaseURL +
      environment.API.bulkImportReceiptTransactions,
      postData
    );
  }

  getMultipleReceiptTaxes(postData: any): Observable<any> {
    return this.http.post(
      environment.API.apiBaseURL + environment.API.getMultipleReceiptTaxes,
      postData,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
      }
    );
  }

  GetRejectReasons(): Observable<any> {
    return this.http.get<DocumentResponse[]>(
      //'https://localhost:44324/api/General/GetRejectReasons',
      environment.API.apiBaseURL + environment.API.getRejectReasons,
      {
        params: {},
      }
    );
  }

  GetLatestBulkImportReceiptRequest(): Observable<any> {
    return this.http.get<DocumentResponse[]>(
      // 'https://localhost:44340/api/Loan/GetLatestBulkImportReceiptRequest',
      environment.API.apiBaseURL +
      environment.API.getLatestBulkImportReceiptRequest,
      {
        params: {},
      }
    );
  }
  getBusinessSources(): Observable<any> {
    return this.http.get<DocumentResponse[]>(
      // 'https://localhost:44324/api/General/GetBusinessSources',
      environment.API.apiBaseURL + environment.API.getBusinessSources,
      {
        params: {},
      }
    );
  }

  getActiveExecutives(name: string): Observable<any> {
    return this.http.get(
      `${environment.API.apiBaseURL}${environment.API.getActiveExecutives}`,
      {
        params: {
          name,
        },
      }
    );
  }

  saveBankIfsc(postData: any): Observable<any> {
    return this.http.post(
      // 'https://localhost:44324/api/General/SaveBankIfsc',
      `${environment.API.apiBaseURL}${environment.API.saveBankIfsc}`,
      postData,
      {}
    );
  }

  getBankIfscs(page: number, pageSize: number, searchText: string) {
    return this.http.get<any>(
      //  'https://localhost:44324/api/General/GetBankIfscs',
      environment.API.apiBaseURL + environment.API.getBankIfscs,
      {
        params: {
          pageNumber: page,
          pageSize: pageSize,
          searchText: searchText,
        },
      }
    );
  }

  getBankIfsc(ifscCode: any) {
    return this.http.get<any>(
      //  'https://localhost:44324/api/General/GetBankIfsc',
      environment.API.apiBaseURL + environment.API.getBankIfsc,
      {
        params: {
          ifscCode: ifscCode,
        },
      }
    );
  }

  getReportID(moduleCode: any, title: any) {
    return this.http.get<Reports[]>(
      environment.API.apiBaseURL + environment.API.getReportID,
      {
        params: {
          moduleCode: moduleCode,
          title: title,
        },
      }
    );
  }

  getActiveBankAccounts() {
    return this.http.get<any>(
      //   "https://localhost:5001/api/Loan/GetCreditBaseDocTypes",
      environment.API.apiBaseURL + environment.API.getActiveBankAccounts
    );
  }

  assignLoanFIExecutive(applicationNo: any, executiveId: any, fiInstructions: any) {
    return this.http.post(
      //'https://localhost:5001/api/Loan/AssignLoanFIExecutive',
      `${environment.API.apiBaseURL}${environment.API.assignLoanFIExecutive}`,
      {
        applicationNumber: applicationNo,
        fiExecutiveID: executiveId,
        fiInstructions: fiInstructions
      },
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
      }
    );
  }

  bulkImportVoucher(postData: any): Observable<any> {
    return this.http.post(
      //    "https://localhost:44331/api/Voucher/BulkImportVoucher",
      environment.API.apiBaseURL + environment.API.bulkImportVoucher,
      postData
    );
  }

  getLatestBulkImportVoucherRequestInfo(): Observable<any> {
    return this.http.get<any>(
      // 'https://localhost:44331/api/Voucher/GetLatestBulkImportVoucherRequestInfo',
      environment.API.apiBaseURL +
      environment.API.getLatestBulkImportVoucherRequestInfo,
      {
        params: {},
      }
    );
  }

  getLastFiveBulkImportVoucherLogs(): Observable<any> {
    return this.http.get<any>(
      //'https://localhost:44331/api/Voucher/GetLastFiveBulkImportVoucherLogs',
      environment.API.apiBaseURL + environment.API.getLastFiveBulkImportVoucherLogs,
      {
        params: {},
      }
    );
  }

  getLatestBulkImportVoucherLogFile(bulkImportVoucherId: any): Observable<any> {
    return this.http.get(
     // `https://localhost:44331/api/Voucher/GetLatestBulkImportVoucherLogFile`,
      `${environment.API.apiBaseURL}${environment.API.getLatestBulkImportVoucherLogFile}`,
      {
        params: {
          bulkImportVoucherId: bulkImportVoucherId
        }, responseType: 'blob'
      }
    );
  }


  updateDepoApplicationFields(body: any) {
    return this.http.post(
      //  'https://localhost:44360/api/Deposit/UpdateDepoApplicationFields',
      environment.API.apiBaseURL + environment.API.updateDepoApplicationFields,
      body
    );
  }

  GetDepoApplicationInfo(applicationNo: any, depositType: any) {
    return this.http.get<any>(
      // 'https://localhost:44360/api/Deposit/GetDepoApplicationInfo',
      environment.API.apiBaseURL + environment.API.getDepoApplicationInfo,
      {
        params: {
          applicationNo: applicationNo,
          depositType: depositType,
        },
      }
    );
  }

  savePolicy(body: any) {
    return this.http.post(
      //'https://localhost:44340/api/Insurance/SavePolicy',
      environment.API.apiBaseURL + environment.API.savePolicy,
      body,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
      }
    );
  }

  removeMappedPolicy(body: any) {
    return this.http.post(
      environment.API.apiBaseURL + environment.API.removeMappedPolicy,
      body,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
      }
    );
  }

  getMappedPolicy(uniqueAccountNumber: any) {
    return this.http.get<any>(

      //'https://localhost:44340/api/Insurance/GetMappedPolicy',
      environment.API.apiBaseURL + environment.API.getMappedPolicy,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          uniqueAccountNumber: uniqueAccountNumber,
        },
      }
    );
  }

  getInsurancPolicyTypes() {
    return this.http.get<any>(
      environment.API.apiBaseURL + environment.API.getInsurancPolicyTypes
    );
  }

  getCibilDataInTUDFFormat(filters: string, firmCode: string) {
    return this.http.get(
      // 'https://localhost:44373/api/Report/GetCibilDataInTUDFFormat',
      environment.API.apiBaseURL + environment.API.getCibilDataInTUDFFormat,
      {
        params: {
          filters: filters,
          firmCode: firmCode
        }
      }
    );
  }


  getLedger(accNo: any, moduleCode: string) {
    return this.http.get<any>(
      environment.API.apiBaseURL + environment.API.getLedger,
      {
        headers: {
          Module: moduleCode,
        },

        params: {
          UniqueAccountNumber: accNo,
        },
      }
    );
  }

  saveMissingReceipt(body: any, moduleCode: any) {
    return this.http.post(
      environment.API.apiBaseURL + environment.API.saveMissingReceipt,
      body,
      {
        headers: {
          Module: moduleCode,
        },
      }
    );
  }

  getPaymentHistory(accNo: string, moduleCode: string) {
    return this.http.get<any>(
      environment.API.apiBaseURL + environment.API.getLoanPaySchedule,
      {
        headers: {
          Module: moduleCode,
        },
        params: {
          UniqueAccountNumber: accNo,
        },
      }
    );
  }

  getFIPendingApplications(
    page: number,
    pageSize: number = environment.paginationDefault,
    filter?: any
  ) {
    return this.http.get<BankResposne>(
      //  'https://localhost:5001/api/Loan/getFIPendingApplications',
      environment.API.apiBaseURL + environment.API.getFIPendingApplications,
      {
        params: {
          PageNumber: page,
          PageSize: pageSize,
          CustomerName: filter?.customerName || '',
          BranchID: filter?.branch || '',
          Period: filter.period || 30,
          stateID: filter?.stateID || '',
          districtID: filter?.districtID || '',
          applicationNo: filter?.applnNo || '',
        },
      }
    );
  }

  saveFIVerification(body: any): Observable<any> {
    return this.http.post<any[]>(
       //"https://localhost:5001/api/Loan/SaveFIVerification",
      environment.API.apiBaseURL + environment.API.saveFIVerification,
      body,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        }
      }
    );
  }

  getSubDealers(dealerId: number) {
    return this.http.get<any[]>(
      // "https://localhost:44340/api/Vechicle/GetSubDealers",
      environment.API.apiBaseURL + environment.API.getSubDealers,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          dealerId: dealerId,
        },
      }
    );
  }

  getSubDealer(subDealerId: number) {
    return this.http.get<any>(
      // "https://localhost:44340/api/Vechicle/GetSubDealer",
      environment.API.apiBaseURL + environment.API.getSubDealer,
      {
        headers: {
          Module: 'VEH',
        },
        params: {
          id: subDealerId,
        },
      }
    );
  }

  getPagedSubDealers(page: number, pageSize: number, searchText: string) {
    return this.http.get<any>(
      // "https://localhost:44340/api/Vechicle/GetPagedSubDealers",
      environment.API.apiBaseURL + environment.API.getPagedSubDealers,
      {
        headers: {
          Module: 'VEH',
        },
        params: {
          pageNumber: page,
          pageSize: pageSize,
          searchText: searchText
        },
      }
    );
  }

  saveSubDealer(postData: any): Observable<any> {
    return this.http.post(
      //  "https://localhost:44340/api/Vechicle/SaveSubDealers",
      `${environment.API.apiBaseURL}${environment.API.saveSubDealer}`,
      postData,
      {
        headers: {
          Module: 'VEH',
        },
      }
    );
  }

  detachLOD(postData: any) {
    return this.http.post(
      environment.API.apiBaseURL + environment.API.detachLOD,
      //'https://localhost:44360/api/Deposit/DetachLOD',
      postData
    );
  }

  reattachLOD(postData: any) {
    return this.http.post(
      environment.API.apiBaseURL + environment.API.reattachLOD,
      //'https://localhost:44360/api/Deposit/ReattachLOD',
      postData
    );
  }

  getLODView(accNo: any) {
    return this.http.get<any>(
      environment.API.apiBaseURL + environment.API.getLODView,
      //'https://localhost:44360/api/Deposit/GetLODView',
      {
        params: {
          UniqueAccountNumber: accNo,
        },
      }
    );
  }

  saveLoanReschedules(postData: any) {
    return this.http.post(
      environment.API.apiBaseURL + environment.API.saveLoanReschedules,
      //'https://localhost:44340/api/Loan/SaveLoanReschedules',
      postData,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        }
      }
    );
  }


  getBucket() {
    return this.http.get<ReportParam[]>(
      environment.API.apiBaseURL + environment.API.getBucket
    );
  }

  exportReportAsBackgroundTask(id: number, filters: string) {
    return this.http.get(
      // 'https://localhost:44373/api/Report/ExportReportAsBackgroundTask',
      environment.API.apiBaseURL + environment.API.exportReportAsBackgroundTask,
      {
        params: {
          id: id,
          filters: filters,
        }
      }
    );
  }

  getFile(id: string): Observable<any> {
    return this.http.get(
      `${environment.API.apiBaseURL}${environment.API.getFile}?id=${id}`,
      { responseType: 'blob' }
    );
  }

  saveMultipleSchemeReschedules(postData: any) {
    return this.http.post(
     environment.API.apiBaseURL + environment.API.saveMultipleSchemeReschedules,
     //  'https://localhost:5001/api/LoanScheme/SaveMultipleSchemeReschedules',
      postData,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        }
      }
    );
  }


  getScheduledReport(code: string) {
    return this.http.get<Dealer[]>(
      //"https://localhost:44340/api/LoanScheme/GetInterestRates",
      environment.API.apiBaseURL + environment.API.getScheduledReport,
      {
        params: {
          code: code
        },
      }
    );
  }

  getLatestBulkImportTranAccountsRequestInfo(): Observable<any> {
    return this.http.get<DocumentResponse[]>(
      //  'https://localhost:44360/api/Deposit/GetLatestBulkImportTranAccountsRequestInfo',
      environment.API.apiBaseURL +
      environment.API.getLatestBulkImportTranAccountsRequestInfo,
      {
        headers: {
          Module: "TA",
        },
      }
    );
  }

  bulkImportTransactionAccountReceiptAndPayments(postData: any): Observable<any> {
    return this.http.post(
      //"https://localhost:44360/api/Deposit/BulkImportTransactionAccountReceiptAndPayments",
      environment.API.apiBaseURL +
      environment.API.bulkImportTransactionAccountReceiptAndPayments,
      postData,
      {
        headers: {
          Module: "TA",
        },
      }
    );
  }

  GetLoanExecutives(accNo: string) {
    return this.http.get<any>(
      environment.API.apiBaseURL + environment.API.GetLoanExecutives,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          UniqueAccountNumber: accNo,
        },
      }
    );
  }

  getCollectionCategories(repaymentIntervalType: string) {
    return this.http.get<any>(
      environment.API.apiBaseURL + environment.API.getCollectionCategories,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          repaymentIntervalType: repaymentIntervalType.toString()
        },
      }
    );
  }


  getActiveRelationshipExecutives(name: string) {
    return this.http.get<any>(
      environment.API.apiBaseURL + environment.API.getActiveRelationshipExecutives,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          name: name
        },
      }
    );
  }
  getActivegenCollectionExecutives(name: string) {
    return this.http.get<any>(
      environment.API.apiBaseURL + environment.API.getActivegenCollectionExecutives,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          name: name
        },
      }
    );
  }
  getActivegenMarketingExecutive(name: string) {
    return this.http.get<any>(
      environment.API.apiBaseURL + environment.API.getActivegenMarketingExecutive,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          name: name
        },
      }
    );
  }


  UpdateLoanExecutive(reqData: any): Observable<any> {
    return this.http.post(
      environment.API.apiBaseURL + environment.API.UpdateLoanExecutive,
      reqData,

      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
      }
    );
  }

  SaveCollectionCategory(reqData: any): Observable<any> {
    return this.http.post(
      environment.API.apiBaseURL + environment.API.getSaveCollectionCategory,
      reqData,

      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
      }
    );
  }

  GetLoanPurposes() {
    return this.http.get<any>(
      environment.API.apiBaseURL + environment.API.gettLoanPurposes,
      {
      }
    );
  }

  GetGpRelations() {
    return this.http.get<any>(
      environment.API.apiBaseURL + environment.API.GetGpRelations,
      {
      }
    );
  }

  GetTaxonomyValues(moduleCode: string) {
    return this.http.get<any>(
      environment.API.apiBaseURL + environment.API.GetTaxonomyValues,
      {
        params: {
          moduleCode: moduleCode
        },
      }
    );
  }

  GetCurrentBranch() {
    return this.http.get<any>(
      environment.API.apiBaseURL + environment.API.GetCurrentBranch,
      {
      }
    );
  }
  KFSDocsClauses(docCode: string, sectionCode: string) {
    return this.http.get<any>(
      environment.API.apiBaseURL + environment.API.GetDocsClauses,
      {
        params: {
          docCode: docCode,
          sectionCode: sectionCode
        },
      }
    );
  }


  getLatestBulkImportTransAccHoldAmountRequestInfo(): Observable<any> {
    return this.http.get<DocumentResponse[]>(
      //'https://localhost:44360/api/Deposit/GetLatestBulkImportTransAccHoldAmountRequestInfo',
      environment.API.apiBaseURL +
      environment.API.getLatestBulkImportTransAccHoldAmountRequestInfo,
      {
        headers: {
          Module: "TA",
        },
      }
    );
  }

  bulkImportTransactionAccountHoldAmount(postData: any): Observable<any> {
    return this.http.post(
      // "https://localhost:44360/api/Deposit/BulkImportTransactionAccountHoldAmount",
      environment.API.apiBaseURL +
      environment.API.bulkImportTransactionAccountHoldAmount,
      postData,
      {
        headers: {
          Module: "TA",
        },
      }
    );
  }


  generateAllBranchProfitAndLossReport(date: any) {
    return this.http.get(
      // 'https://localhost:44331/api/DynamicReport/GenerateAllBranchProfitAndLossReport',
      environment.API.apiBaseURL + environment.API.generateAllBranchProfitAndLossReport,
      {
        params: {
          asOnDate: date
        }
      }
    );
  }

  generateAllBranchBalanceSheet(date: any) {
    return this.http.get(
      // 'https://localhost:44331/api/DynamicReport/GenerateAllBranchBalanceSheetReport',
      environment.API.apiBaseURL + environment.API.generateAllBranchBalanceSheetReport,
      {
        params: {
          asOnDate: date
        }
      }
    );
  }

  getAllBranchReportData(id: string): Observable<any> {
    return this.http.get(


      // `https://localhost:44331/api/DynamicReport/GetAllBranchReportData?uniqueID=${id}`,
      `${environment.API.apiBaseURL}${environment.API.getAllBranchReportData}?uniqueID=${id}`,
      { responseType: 'blob' }
    );
  }

  getReportStatus(uniqueID: any) {
    return this.http.get(
      // `https://localhost:44331/api/DynamicReport/GetReportStatus`,

      environment.API.apiBaseURL + environment.API.getReportStatus,
      {
        params: {
          uniqueID: uniqueID
        }
      }
    );
  }

  resubmitReceipts(body: any, moduleCode: any) {
    return this.http.post(
      environment.API.apiBaseURL + environment.API.resubmitReceipts,
      body,
      {
        headers: {
          Module: moduleCode,
        },
      }
    );
  }

  generateProfitAndLossReport(branchID: any, date: any) {
    return this.http.get(
      // 'https://localhost:44331/api/DynamicReport/GenerateAllBranchBalanceSheetReport',
      environment.API.apiBaseURL + environment.API.generateProfitAndLossReport,
      {
        params: {
          branchID: branchID,
          asOnDate: date
        }
      }
    );
  }

  generateBranchBalanceSheet(branchID: any, date: any) {
    return this.http.get(
      // 'https://localhost:44331/api/DynamicReport/GenerateAllBranchBalanceSheetReport',
      environment.API.apiBaseURL + environment.API.generateBranchBalanceSheet,
      {
        params: {
          branchID: branchID,
          asOnDate: date
        }
      }
    );
  }

  getReportData(uniqueID: any) {
    return this.http.get(
      // 'https://localhost:44331/api/DynamicReport/GenerateAllBranchBalanceSheetReport',
      environment.API.apiBaseURL + environment.API.getReportData,
      {
        params: {
          uniqueID: uniqueID
        }
      }
    );
  }

   getReportForId3(code: string, filters: string) {
    return this.http.get<any>(
      environment.API.apiBaseURL + environment.API.getReportForId3,
      {
        params: {
          code: code,
          filters: filters,
        },
      }
    );
  }

  GetGoldGlobalLoanSettings() {
    return this.http.get<any[]>(
      environment.API.apiBaseURL + environment.API.getGoldGlobalLoanSettings
    );
  }

  GetCertificatePrint(uniqueAccountNumber: string) {
    return this.http.get(
      environment.API.apiBaseURL + environment.API.GetCertificatePrint,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,

        },
        params: {
          uniqueAccountNumber: uniqueAccountNumber
        },
        responseType: 'text'
      }
    );
  }


  GetNoObjectionCertificatePrint(uniqueAccountNumber: string) {
    return this.http.get(
      environment.API.apiBaseURL + environment.API.GetNoObjectionCertificatePrint,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          uniqueAccountNumber: uniqueAccountNumber
        },
        responseType: 'blob'
      }
    );
  }


  GetLoanApplication(accountNumber: string) {
    return this.http.get(
      environment.API.apiBaseURL + environment.API.GetLoanApplication,
      {
        params: {
          accountNumber: accountNumber
        }
      }
    );
  }

  GetgoldLoanSchemeByName(name: any) {
    return this.http.get(
      environment.API.apiBaseURL + environment.API.GetgoldLoanSchemeByName,
      {
        params: { name: name },
      }
    );
  }


  getLatestBulkImportTranAccountsLogFile(): Observable<any> {
    return this.http.get(
      //`https://localhost:44360/api/Deposit/GetLatestBulkImportTranAccountsLogFile`,
      `${environment.API.apiBaseURL}${environment.API.getLatestBulkImportTranAccountsLogFile}`,

      {
        headers: {
          Module: "TA",
        },
        responseType: 'blob'
      }
    );
  }

  getLatestBulkImportTranAccountsHoldAmtLogFile(): Observable<any> {
    return this.http.get(
      // `https://localhost:44360/api/Deposit/GetLatestBulkImportTranAccountsHoldAmtLogFile`,
      `${environment.API.apiBaseURL}${environment.API.getLatestBulkImportTranAccountsHoldAmtLogFile}`,
      {
        headers: {
          Module: "TA",
        },
        responseType: 'blob'
      }
    );
  }

  getLatestBulkImportReceiptLogFile(): Observable<any> {
    return this.http.get(
      // `https://localhost:5001/api/Loan/GetLatestBulkImportReceiptLogFile`,
      `${environment.API.apiBaseURL}${environment.API.getLatestBulkImportReceiptLogFile}`,
      { responseType: 'blob' }
    );
  } 

  updateLoanSettings(data: any, moduleCode: any): Observable<any> {
    return this.http.post(
      "https://localhost:5001/api/Loan/UpdateLoanSettings",
      //`${environment.API.apiBaseURL}${environment.API.updateLoanSettings}`,
      data,
      {
        headers: {
          Module: moduleCode,
        },
      }
    );
  }

  goldInterestDue(accountNumber: string, interestUpto: any, transDate: any, isClosing: any) {
    return this.http.get(
      environment.API.apiBaseURL + environment.API.goldInterestDue,
      {
        params: {
          accountNumber: accountNumber,
          interestUpto: interestUpto,
          transDate: transDate,
          isClosing: isClosing
        }
      }
    );
  }



  getLoanApprovedInfo(applicationId: number): Observable<any> {
    return this.http.get<DocumentResponse[]>(
      environment.API.apiBaseURL + environment.API.getLoanApprovedInfo,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          moduleCode: this.uiStateService.selectedModuleCode,
          applnID: applicationId,
        },
      }
    );
  }

  updateGeneralSettings(data: any): Observable<any> {
    return this.http.post(
      //"https://localhost:44324/api/General/UpdateGeneralSettings",
      `${environment.API.apiBaseURL}${environment.API.updateGeneralSettings}`,
      data
    );
  }

  getKycConfigSettings() {
    return this.http.get<any>(
      // "https://localhost:44324/api/General/GetKycConfigSettings"
      environment.API.apiBaseURL + environment.API.getKycConfigSettings
    );
  }

  fiVerificationReturn(body: any): Observable<any> {
    return this.http.post<any[]>(
      //"https://localhost:5001/api/Loan/FIVerificationReturn",
      environment.API.apiBaseURL + environment.API.fiVerificationReturn,
      body,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        }
      }
    );
  }

  cancelFIVerification(body: any): Observable<any> {
    return this.http.post<any[]>(
       //"https://localhost:5001/api/Loan/CancelFIVerification",
     environment.API.apiBaseURL + environment.API.cancelFIVerification,
      body,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        }
      }
    );
  } 
  completeFIVerification(body: any): Observable<any> {
    return this.http.post<any[]>(
      //"https://localhost:5001/api/Loan/CompleteFIVerification",
      environment.API.apiBaseURL + environment.API.completeFIVerification,
      body,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        }
      }
    );
  }

  getLoanFIExecutives(applnID: string) {
    return this.http.get<ApplicationDetails>(
      // "https://localhost:5001/api/Loan/GetLoanFIExecutives",
      environment.API.apiBaseURL + environment.API.getLoanFIExecutives,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          applnID: applnID
        },
      }
    );
  }

  getLoanFIExecutiveInfo(applnID: string) {
    return this.http.get<ApplicationDetails>(
      //  "https://localhost:5001/api/Loan/GetLoanFIExecutiveInfo",
      environment.API.apiBaseURL + environment.API.getLoanFIExecutiveInfo,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          applnID: applnID
        },
      }
    );
  }


  unapproveLoanDiscount(body: any): Observable<any> {
    return this.http.post<any[]>(
      // "https://localhost:5001/api/Loan/UnapproveLoanDiscount",
      environment.API.apiBaseURL + environment.API.unapproveLoanDiscount,
      body,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        }
      }
    );
  }
  getTUDFReportFile(id: string): Observable<any> {
    return this.http.get(


      //`https://localhost:44373/api/Report/getTUDFReportFile?uniqueID=${id}`,
      `${environment.API.apiBaseURL}${environment.API.getTUDFReportFile}?uniqueID=${id}`,
      { responseType: 'blob' }
    );
  }

  getTUDFReportStatus(uniqueID: any) {
    return this.http.get(
      //`https://localhost:44373/api/Report/GetTUDFReportStatus`,

      environment.API.apiBaseURL + environment.API.getTUDFReportStatus,
      {
        params: {
          uniqueID: uniqueID
        }
      }
    );
  }


  insertFrozenLoan(reqData: any): Observable<any> {
    console.log('inside api service - insertFrozenLoan function')
    return this.http.post(
      `${environment.API.apiBaseURL}${environment.API.insertFrozenLoan}`,
      reqData,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
      }
    );
  }
  getLoanFrozenDetails(accNo: string) {
    return this.http.get(

      //"https://localhost:5001/api/Loan/GetLoanFrozenDetails",
      environment.API.apiBaseURL + environment.API.getLoanFrozenDetails,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          uniqueAccountNumber: accNo
        },
      }
    );
  }

  saveLoanFreezeRequest(body: any): Observable<any> {
    return this.http.post<any[]>(
      // "https://localhost:5001/api/Loan/SaveLoanFreezeRequest",
      environment.API.apiBaseURL + environment.API.saveLoanFreezeRequest,
      body,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        }
      }
    );
  }

  getLoanAppCustomerByID(custId: string, applnID: any) {
    return this.http.get<any>(
      //"https://localhost:5001/api/Loan/GetLoanAppCustomerByID",
      environment.API.apiBaseURL + environment.API.getLoanAppCustomerByID,
      {
        params: {
          applnID: applnID,
          customerID: custId
        },
      }
    );
  }


  getCustomerPreChecks(applnID: any) {
    return this.http.get<any>(
      //"https://localhost:5001/api/Loan/GetCustomerPreChecks",
      environment.API.apiBaseURL + environment.API.getCustomerPreChecks,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          applnID: applnID
        },
      }
    );
  }

  customerPreCheckValidation(body: any): Observable<any> {
    return this.http.post<any[]>(
      // "https://localhost:5001/api/Loan/CustomerPreCheckValidation",
      environment.API.apiBaseURL + environment.API.customerPreCheckValidation,
      body,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        }
      }
    );
  }

    saveMultipleStateWiseLoanReschedules(postData: any) {
    return this.http.post(
      environment.API.apiBaseURL + environment.API.saveMultipleStateWiseLoanReschedules,
      //'https://localhost:5001/api/Loan/SaveStateWiseLoanReschedules',
      postData,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        }
      }
    );
  }

    saveMultipleBranchWiseLoanReschedules(postData: any) {
    return this.http.post(
       environment.API.apiBaseURL + environment.API.saveMultipleBranchWiseLoanReschedules,
       //'https://localhost:5001/api/Loan/SaveBranchWiseLoanReschedules',
      postData,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        }
      }
    );
  }  

  getLoanUPISettings(moduleCode: any) {
    return this.http.get<any>(
      environment.API.apiBaseURL + environment.API.getLoanUPISettings,
      {
        headers: {
          Module: moduleCode,
        },
      }
    );
  }

  getLoanSchemes() {
    return this.http.get<Scheme[]>(
      environment.API.apiBaseURL + environment.API.getLoanSchemes,
      //'https://localhost:44340/api/LoanScheme/GetActiveLoanSchemes',
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {
          moduleCode: this.uiStateService.selectedModuleCode 
        },
      }
    );
  }
}
