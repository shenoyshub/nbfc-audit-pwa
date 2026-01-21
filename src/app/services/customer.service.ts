import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { AppUser } from '../state/user.state';
import { UiStateService } from '../services/ui-state.service';
import { environment } from '../../environments/environment';
import { CustomerDetails, MenuListResp } from '../models/vehicleLoan';



@Injectable({
  providedIn: 'root',
})
export class CustomerService extends BaseService {
  constructor(private http: HttpClient, private uiStateService: UiStateService) {
    super();
  }

  getCustomerDetails(custId: string) {
    return this.http.get<CustomerDetails>(
      //
     // "https://localhost:44356/api/v2.0/Customer/GetCustomerByID",
      environment.API.apiBaseURL + environment.API.getCustomerDetailsV2,
      {
        params: {
          id: custId,
        },
      }
    );
  }

  getMenuDetails() {
    return this.http.get<MenuListResp>(
      //"https://localhost:44356/api/v2.0/General/GetMenu"
      environment.API.apiBaseURL + environment.API.getMenu
    );
  }

  getUserDetails() {
    return this.http.get<AppUser>(
      environment.API.apiBaseURL + environment.API.getCurrentUser
    );
  }

  GetCurrentUserRoles(): Observable<any> {
    return this.http.get<any>(
      environment.API.apiBaseURL + environment.API.getCurrentUserRoles)
  }

  setCurrentBranch(brId: number) {
    this.http.get<AppUser>(
      environment.API.apiBaseURL + environment.API.getCurrentUser
    );
    return this.http.post<any>(
      environment.API.apiBaseURL + environment.API.setCurrentBranch,
      { brId: brId }
    );
  }

  getCustomerCreditScoreDetails(custId: string) {
    return this.http.get<any>(
      environment.API.apiBaseURL +
      environment.API.getCustomerCreditScoreHistory,
      {
        params: {
          customerid: custId,
        },
      }
    );
  }

  getCustomerLoanHistory(custId: string) {
    return this.http.get<any>(
      environment.API.apiBaseURL + environment.API.getCustomerLoanHistory,
      {
        params: {
          customerid: custId,
        },
      }
    );
  }

  getCustomerVerificationHistory(custId: string) {
    return this.http.get<any>(
      environment.API.apiBaseURL +
      environment.API.getCustomerVerificationHistory,
      {
        params: {
          customerid: custId,
        },
      }
    );
  }

  getCustomerKycDocuments(custId: string) {
    return this.http.get<any>(
      environment.API.apiBaseURL + environment.API.getCustomerKycDocuments,
      {
        params: {
          customerid: custId,
        },
      }
    );
  }

  // getCustomerCreditCheck(applicationID: any) {
  //   return this.http.get<CreditCheck[]>(
  //     environment.API.apiBaseURL + environment.API.creditCheck,
  //     {
  //       headers: {
  //         Module: this.uiStateService.selectedModuleCode,
  //       },
  //       params: {
  //         applicationID: applicationID,
  //       },
  //     }
  //   );
  // }

  // postCustomerCreditHistory(requestBody: any) {
  //   return this.http.post<CreditCheckHistory[]>(
  //     environment.API.apiBaseURL + environment.API.creditDetails,
  //     requestBody
  //   );
  // }

  // submitLoanCreditApporvalStatus(applID: string, isApproved: boolean) {
  //   return this.http.post<any>(

  //     // "https://localhost:44340/api/Loan/SaveVarificationDetails",
  //     environment.API.apiBaseURL + environment.API.saveCreditScore,
  //     {
  //       ApplicationID: applID,
  //       IsApproved: isApproved,
  //     }
  //   );
  // }

  // getCreditReportLoans(requestBody: any) {
  //   return this.http.post<CreditReportLoan[]>(
  //     // "https://localhost:44356/api/Customer/GetCreditReportLoans",
  //     environment.API.apiBaseURL + environment.API.creditReportDetails,
  //     requestBody
  //   );
  // }



  // getVerificationStatus(applID: any) {
  //   return this.http.get<any>(
  //     // 'https://localhost:5001/api/Loan/GetVerifiedInfo',
  //     environment.API.apiBaseURL + environment.API.verificationStatus,
  //     {
  //       headers: {
  //         Module: this.uiStateService.selectedModuleCode,
  //       },
  //       params: {
  //         applicationId: applID,
  //       },
  //     }
  //   );
  // }

  // getFIVerifiedInfo(applID: any) {
  //   return this.http.get<any>(
  //     //'https://localhost:5001/api/Loan/GetFIVerifiedInfo',
  //     environment.API.apiBaseURL + environment.API.getFIVerifiedInfo,
  //     {
  //       headers: {
  //         Module: this.uiStateService.selectedModuleCode,
  //       },
  //       params: {
  //         applicationId: applID,
  //       },
  //     }
  //   );
  // }

  // getLoanFeeStructure(scheme: string) {
  //   return this.http.get<FeeStructre[]>(
  //     environment.API.apiBaseURL + environment.API.getLoanFeeStructure,
  //     {
  //       headers: {
  //         Module: this.uiStateService.selectedModuleCode,
  //       },
  //       params: {
  //         code: scheme,
  //       },
  //     }
  //   );
  // }

  // getAvailableInstDates(
  //   scheme: string,
  //   instCount: number,
  //   intRate: number,
  //   intRateMain: number,
  //   intOther: number,
  //   amt: number,
  //   disbursementDate: any
  // ) {
  //   return this.http.get<string[]>(
  //     environment.API.apiBaseURL + environment.API.getAvailableInstDates,
  //     {
  //       headers: {
  //         Module: this.uiStateService.selectedModuleCode,
  //       },
  //       params: {
  //         LoanType: scheme,
  //         InstallmentCount: instCount,
  //         InterestRate: intRate,
  //         InterestRateMain: intRateMain,
  //         InterestRateOther: intOther,
  //         Amount: amt,
  //         StartDate: disbursementDate,
  //       },
  //     }
  //   );
  // }

  // getAccountHeads(key: string) {
  //   return this.http.get<BankDetails[]>(
  //     environment.API.apiBaseURL + environment.API.getAccounts,
  //     {
  //       headers: {
  //         Module: this.uiStateService.selectedModuleCode,
  //       },
  //       params: {
  //         Key: key,
  //         'AccountTypes[0][AccType]': 0,
  //         'AccountTypes[0][Value]': true,
  //       },
  //     }
  //   );
  // }

  // disburseLoan(body: any) {
  //   return this.http.post<BankDetails[]>(
  //     //"https://localhost:5001/api/Loan/SaveDisbursementDetails",
  //     environment.API.apiBaseURL + environment.API.saveDisbursement,
  //     body,
  //     {
  //       headers: {
  //         Module: this.uiStateService.selectedModuleCode,
  //       },
  //     }
  //   );
  // }

  getBranches() {
    return this.http.get<any[]>(
      environment.API.apiBaseURL + environment.API.getBranches,
      {
        headers: {
          Module: this.uiStateService.selectedModuleCode,
        },
        params: {},
      }
    );
  }

  // getAssociateBranchByHeadId(
  //   branchHeadId: number | string | undefined
  // ): Observable<any> {
  //   return this.http.get<any[]>(
  //     environment.API.apiBaseURL + environment.API.getAssociateBranchByHeadID,
  //     {
  //       headers: {
  //         Module: this.uiStateService.selectedModuleCode,
  //       },
  //       params: {
  //         id: branchHeadId as string,
  //       },
  //     }
  //   );
  // }

  getStates() {
    return this.http.get<any[]>(
      environment.API.apiBaseURL + environment.API.getStates
    );
  }

  // getSalutations() {
  //   return this.http.get<any[]>(
  //     environment.API.apiBaseURL + environment.API.getSalutations
  //   );
  // }

  // getNationalities() {
  //   return this.http.get<any[]>(
  //     environment.API.apiBaseURL + environment.API.getNationalities
  //   );
  // }

  // getCountries() {
  //   return this.http.get<any[]>(
  //     environment.API.apiBaseURL + environment.API.getCountries
  //   );
  // }

  // getNonIndividualEntityTypes() {
  //   return this.http.get<any[]>(
  //     environment.API.apiBaseURL + environment.API.getNonIndividualEntityTypes
  //   );
  // }

  // getProfessions() {
  //   return this.http.get<any[]>(
  //     environment.API.apiBaseURL + environment.API.getProfessions
  //   );
  // }

  // getIncomeRanges() {
  //   return this.http.get<any[]>(
  //     environment.API.apiBaseURL + environment.API.getIncomeRanges
  //   );
  // }

  getLocalBodyTypes() {
    return this.http.get<any[]>(
      environment.API.apiBaseURL + environment.API.getLocalBodyTypes
    );
  }

  // getDistricts(stateId: number) {
  //   return this.http.get<any[]>(
  //     environment.API.apiBaseURL + environment.API.getDistricts,
  //     {
  //       params: {
  //         stateId: stateId,
  //       },
  //     }
  //   );
  // }

  // getTehsils(districtId: number) {
  //   return this.http.get<any[]>(
  //     environment.API.apiBaseURL + environment.API.getTehsils,
  //     {
  //       params: {
  //         districtId: districtId,
  //       },
  //     }
  //   );
  // }

  // getPostOffices(pincode: number) {
  //   return this.http.get<any[]>(
  //     environment.API.apiBaseURL + environment.API.getPostOffices,
  //     {
  //       params: {
  //         pincode: pincode,
  //       },
  //     }
  //   );
  // }

  // getVillages(tehsilId: number) {
  //   return this.http.get<any[]>(
  //     environment.API.apiBaseURL + environment.API.getVillages,
  //     {
  //       params: {
  //         tehsilId: tehsilId,
  //       },
  //     }
  //   );
  // }

  // getLocalBodies(typeId: number, districtId: number) {
  //   return this.http.get<any[]>(
  //     environment.API.apiBaseURL + environment.API.getLocalBodies,
  //     {
  //       params: {
  //         typeId: typeId,
  //         districtId: districtId,
  //       },
  //     }
  //   );
  // }

  // getCustomerProfileSummary(customerId: string): Observable<any> {
  //   return this.http.get<any[]>(
  //     environment.API.apiBaseURL + environment.API.GetCustomerProfileSummary,
  //     {
  //       params: {
  //         id: customerId,
  //       },
  //     }
  //   );
  // }

  // getCustomerImage(customerId: string): Observable<any> {
  //   return this.http.get<any[]>(
  //     environment.API.apiBaseURL + environment.API.getCustomerImage,
  //     {
  //       params: {
  //         customerId: customerId,
  //       },
  //     }
  //   );
  // }

  // getBankAddress(ifsc: string) {
  //   return this.http.get<any[]>(
  //     environment.API.apiBaseURL + environment.API.getBankAddress,
  //     {
  //       params: {
  //         ifsc: ifsc,
  //       },
  //     }
  //   );
  // }

  // getMatchedCustomers(body: any) {
  //   return this.http.post<any[]>(
  //     //"https://localhost:44356/api/Customer/GetMatchedCustomers",
  //     environment.API.apiBaseURL + environment.API.getMatchedCustomers,
  //     body
  //   );
  // }

  // rejectCustomerKyc(customerID: any, comments: any = null) {
  //   return this.http.post(
  //     //  "https://localhost:44356/api/Customer/RejectCustomerKyc",
  //     environment.API.apiBaseURL + environment.API.rejectCustomerKyc,
  //     {
  //       comments: comments,
  //       customerID: customerID
  //     }

  //   );
  // }

  // submitKycForRepair(customerID: any, comments: any = null) {
  //   return this.http.post(
  //     //  "https://localhost:44356/api/Customer/RejectCustomerKyc",
  //     environment.API.apiBaseURL + environment.API.submitKycForRepair,
  //     {
  //       comments: comments,
  //       customerID: customerID
  //     }

  //   );
  // }

  // ApproveCustomerKyc(body: any, uniqueId: any) {
  //   return this.http.post<any[]>(
  //     //  "https://localhost:44356/api/Customer/ApproveCustomerKyc",
  //    environment.API.apiBaseURL + environment.API.approveCustomerKyc,
  //     body,
  //     {
  //       headers: {
  //         UniqueID: uniqueId
  //       },
  //     }
  //   );
  // }

  // saveCustomerKYCRequest(body: any, uniqueId: any) {
  //   return this.http.post<any[]>(
  //   // "https://localhost:44356/api/Customer/SaveCustomerKYCRequest",
  //      environment.API.apiBaseURL + environment.API.saveCustomerKYCRequest,
  //     body,
  //     {
  //       headers: {
  //         UniqueID: uniqueId
  //       },
  //     }
  //   );
  // }

  // postCustomer(body: any, uniqueId: any) {
  //   return this.http.post<any[]>(
  //     // "https://localhost:44356/api/Customer/PostCustomer",
  //     environment.API.apiBaseURL + environment.API.postCustomer,
  //     body,
  //     {
  //       headers: {
  //         UniqueID: uniqueId
  //       },
  //     }
  //   );
  // }

  // getActiveMarketingExecutives(name: string): Observable<any> {
  //   return this.http.get(
  //     `${environment.API.apiBaseURL}${environment.API.getActiveMarketingExecutives}`,
  //     {
  //       params: {
  //         name,
  //       },
  //     }
  //   );
  // }

  // getActiveRelationshipExecutives(name: string): Observable<any> {
  //   return this.http.get(
  //     `${environment.API.apiBaseURL}${environment.API.getActiveRelationshipExecutives}`,
  //     {
  //       params: {
  //         name,
  //       },
  //     }
  //   );
  // }

  // getActiveCollectionExecutives(name: string): Observable<any> {
  //   return this.http.get(
  //     `${environment.API.apiBaseURL}${environment.API.getActiveCollectionExecutives}`,
  //     {
  //       params: {
  //         name,
  //       },
  //     }
  //   );
  // }

  // getInsuranceCompanies(): Observable<any> {
  //   return this.http.get(
  //     `${environment.API.apiBaseURL}${environment.API.getInsuranceCompanies}`
  //   );
  // }

  // getCustomerLiability(customerId: string | number): Observable<any> {
  //   return this.http.get(
  //     `${environment.API.apiBaseURL}${environment.API.GetLiabilities}`,
  //     {
  //       params: {
  //         customerID: customerId,
  //         _: +new Date(),
  //       },
  //     }
  //   );
  // }

  // getCustomerProfession(): Observable<any> {
  //   return this.http.get(
  //     `${environment.API.apiBaseURL}${environment.API.GetCustomerProfession}`,
  //     {
  //       params: {
  //         _: +new Date(),
  //       },
  //     }
  //   );
  // }

  // getFlagReasons(): Observable<any> {
  //   return this.http.get(
  //     `${environment.API.apiBaseURL}${environment.API.GetFlagReasons}`,
  //     {
  //       params: {
  //         _: +new Date(),
  //       },
  //     }
  //   );
  // }

  // getImageBytesByID(imageID: string): Observable<any> {
  //   return this.http.get(
  //     `${environment.API.apiBaseURL}${environment.API.GetImageBytesByID}`,
  //     {
  //       params: {
  //         uniqueID: imageID,
  //         _: +new Date(),
  //       },
  //     }
  //   );
  // }

  // getBeneficiaryAccounts(customerId: string): Observable<any> {
  //   return this.http.get(
  //     `${environment.API.apiBaseURL}${environment.API.GetBeneficiaryAccounts}`,
  //     {
  //       params: {
  //         customerId: customerId
  //       },
  //     }
  //   );
  // }


  getGeneralSettings() {
    return this.http.get<any[]>(
      environment.API.apiBaseURL + environment.API.getGeneralSettings
    );
  }

  // getRelations() {
  //   return this.http.get<any[]>(
  //     environment.API.apiBaseURL + environment.API.GetRelations
  //   );
  // }

  // calculateAge(dob: any) {
  //   const customerDob = new Date(dob);
  //   const currentDate = new Date();

  //   let ageInYears = currentDate.getFullYear() - customerDob.getFullYear();
  //   let ageInMonths = currentDate.getMonth() - customerDob.getMonth();

  //   if (ageInMonths < 0) {
  //     ageInYears--;
  //     ageInMonths += 12;
  //   }



  //   return (ageInYears > 0 && ageInMonths > 0) ? `${ageInYears} Years ${ageInMonths} Months` :
  //     (ageInYears > 0 && !(ageInMonths > 0)) ? `${ageInYears} Years` : `${ageInMonths} Months`;


  // }

  // generateAadhaarOTP(aadhaarNumber: any) {
  //   return this.http.post<any[]>(
  //     environment.API.apiBaseURL + environment.API.generateAadhaarOTP,
  //     {
  //       AadhaarNumber: aadhaarNumber
  //     }
  //   );
  // }

  // submitAadhaarOTP(otp: any, uniqueID: any) {
  //   return this.http.post<any[]>(
  //     environment.API.apiBaseURL + environment.API.submitAadhaarOTP,
  //     {
  //       OTP: otp,
  //       UniqueID: uniqueID
  //     }
  //   );
  // }


  // getCustomerEditHistory(custId: string) {
  //   return this.http.get<any>(
  //     // "https://localhost:44356/api/v2.0/Customer/GetCustomerEditHistory",
  //     environment.API.apiBaseURL + environment.API.getCustomerEditHistory,
  //     {
  //       params: {
  //         customerid: custId,
  //       },
  //     }
  //   );
  // }

  // getActiveFIExecutives(name: string): Observable<any> {
  //   return this.http.get(

  //     //"https://localhost:44356/api/General/GetActiveFieldInspectionExecutives",
  //     `${environment.API.apiBaseURL}${environment.API.getActiveFIExecutives}`,
  //     {
  //       params: {
  //         name,
  //       },
  //     }
  //   );
  // }


  // sendSMSConfirmation(customerId: any): Observable<any> {
  //   return this.http.get(

  //     //"https://localhost:44356/api/Customer/SendSMSConfirmation",
  //     `${environment.API.apiBaseURL}${environment.API.sendSMSConfirmation}`,
  //     {
  //       params: {
  //         customerId: customerId
  //       }
  //     }
  //   );
  // }

  // verifyPhoneNumberOTP(customerId: any, otp: any): Observable<any> {
  //   return this.http.get(

  //     //"https://localhost:44356/api/Customer/VerifyPhoneNumberOTP",
  //     `${environment.API.apiBaseURL}${environment.API.verifyPhoneNumberOTP}`,
  //     {
  //       params: {
  //         customerId: customerId,
  //         OTPCode: otp
  //       }
  //     }
  //   );
  // }


  // verifyBankAccount(accountNumber: string, ifsc: string, customerID: string) {
  //   return this.http.get(
  //     // `https://localhost:44356/api/Customer/VerifyBankAccount`,

  //     environment.API.apiBaseURL + environment.API.verifyBankAccount,
  //     {
  //       params: {
  //         accountNumber: accountNumber,
  //         ifsc: ifsc,
  //         customerID: customerID
  //       }
  //     }
  //   );
  // }

  // getExternalKYCDocumentInfo(documentType: string, documentNumber: string) {
  //   return this.http.get(
  //     // `https://localhost:44356/api/Customer/VerifyBankAccount`,

  //     environment.API.apiBaseURL + environment.API.getExternalKYCDocumentInfo,
  //     {
  //       params: {
  //         documentType: documentType,
  //         documentNumber: documentNumber
  //       }
  //     }
  //   );
  // }


  // isVerifiedDocument(customerID: string, documentType: string, documentNumber: string) {
  //   return this.http.get(
  //     // `https://localhost:44356/api/Customer/VerifyBankAccount`,

  //     environment.API.apiBaseURL + environment.API.isVerifiedDocument,
  //     {
  //       params: {
  //         customerID: customerID,
  //         documentType: documentType,
  //         documentNumber: documentNumber
  //       }
  //     }
  //   );
  // }

  // verifyKYCDocuments(body: any) {
  //   return this.http.post<any[]>(
  //     environment.API.apiBaseURL + environment.API.verifyKYCDocuments,
  //     body
  //   );
  // }
  // externalKYCDocumentInfoVerification(body: any) {
  //   return this.http.post<any[]>(
  //     environment.API.apiBaseURL + environment.API.externalKYCDocumentInfoVerification,
  //     body
  //   );
  // }

  // resetCKYCProfileSync(customerIDs: any, reasonAndReference: any) {
  //   return this.http.post<any[]>(
  //     //'https://localhost:44356/api/Customer/ResetCKYCProfileSync',
  //     environment.API.apiBaseURL + environment.API.resetCKYCProfileSync,
  //     {
  //       customerIDs: customerIDs,
  //       reasonAndReference: reasonAndReference
  //     }
  //   );
  // }



  getLatestBulkImportCustomerRequest(): Observable<any> {
    return this.http.get<any>(
      //'https://localhost:44356/api/Customer/GetLatestBulkImportCustomerRequest',
      environment.API.apiBaseURL + environment.API.getLatestBulkImportCustomerRequest,
      {
        params: {},
      }
    );
  }

  bulkImportCustomers(postData: any): Observable<any> {
    return this.http.post(
      //  "https://localhost:44356/api/Customer/BulkImportCustomers",
      environment.API.apiBaseURL + environment.API.bulkImportCustomers,
      postData
    );
  }

  getLatestBulkImportCustomerLogFile(bulkImportVoucherId: any): Observable<any> {
    return this.http.get(
      // `https://localhost:44356/api/Customer/GetLatestBulkImportCustomerLogFile`,
      `${environment.API.apiBaseURL}${environment.API.getLatestBulkImportCustomerLogFile}`,
      {
        params: {
          bulkImportVoucherId: bulkImportVoucherId
        }, responseType: 'blob'
      }
    );
  }



  getLastFiveBulkImportCustomerLogs(): Observable<any> {
    return this.http.get<any>(
      //'https://localhost:44356/api/Customer/GetLastFiveBulkImportCustomerLogs',
      environment.API.apiBaseURL + environment.API.getLastFiveBulkImportCustomerLogs,
      {
        params: {},
      }
    );
  }

  updateCustomerBaseBranch(customerIDs: any, reasonAndReference: any, branchID: any) {
    return this.http.post<any[]>(
     // 'https://localhost:44356/api/Customer/UpdateCustomerBaseBranch',
      environment.API.apiBaseURL + environment.API.updateCustomerBaseBranch,
      {
        customerIDs: customerIDs,
        branchID: branchID,
        reasonAndReference: reasonAndReference
      }
    );
  }
 
 cancelCustomerKYCRequest(requestBody: any) {
    return this.http.post(
       // "https://localhost:44356/api/Customer/CancelCustomerKYCRequest",
      environment.API.apiBaseURL + environment.API.cancelCustomerKYCRequest,
      requestBody

    );
  }
  
}
