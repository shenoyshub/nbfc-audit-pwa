import { EventEmitter, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import {  combineLatest, map, Observable } from "rxjs";
import { setCompanyInfo, setMenuList, setUserInfo } from "../actions/app.actions";
import { AppService } from "./app.service";
import { CustomerService } from "./customer.service";
import { ToastrService } from "ngx-toastr";


@Injectable({
  providedIn: 'root',
})
export class InitalDataService {

  companyDetails: any = {};
  menuList!: any;
  appUser: any = {};
  branches: any = [];
  userRoles: any = [];
  states: any = [];
  hasSysAdminPermission: boolean = false;
  isUserFIExecutive: boolean = false;
  generalSettings: any = {};
  googleApiSettings: any = {};
  localBodyTypes: any = [];
  activeBankAccounts: any = [];
  //private onChange$ = new BehaviorSubject<any>({});
  //onChangeValue$ = this.onChange$.asObservable();
  dataByEvent: EventEmitter<any> = new EventEmitter<any>();
  constructor(private app: AppService, private store: Store<{ app: {} }>,
    private customer: CustomerService,
    private toastr: ToastrService) { }

  init(): Observable<any> {
    return combineLatest([
      this.app.getCompanyDetails().pipe(
        map((response) => {
          this.store.dispatch(
            setCompanyInfo({
              companyInfo: response,
            })
          );
          this.companyDetails = response;
        })
      ),
      this.customer.getMenuDetails().pipe(
        map((response) => { 
          this.store.dispatch(
            setMenuList({
              menuList: response?.menu || [],
              //menuList: response.menu.filter((e) => e.module == 'LN' && e.children?.length > 0) || [],
            })
          );
          this.menuList = response?.menu || [];
        })
      ),
      this.customer.getUserDetails().pipe(
        map((response) => {
          this.customer.setCurrentBranch(response.currentBranch!).subscribe();
          this.store.dispatch(
            setUserInfo({
              userDetails: response,
            })
          );
          this.appUser = response;
          this.hasSysAdminPermission = this.appUser?.permissions?.includes('SYS_ADMIN') ?? false;
          this.isUserFIExecutive = this.appUser?.executiveTypes?.includes('FieldInspection') ?? false;
          if (this.appUser?.passwordExpiryDays <= 6 && this.appUser?.passwordExpiryDays > 0) {
            this.toastr.warning(`Your password will expire within ${this.appUser?.passwordExpiryDays} days.`)
          }
          if (!this.isUserFIExecutive) {
            this.app.getActiveBankAccounts().subscribe((accounts: any) => {
              this.activeBankAccounts = accounts;
            })
          }
        })
      ),

      this.customer.getBranches().pipe(
        map(response => {
          this.branches = response;
        })
      ),
      this.customer.GetCurrentUserRoles().pipe(
        map(response => {
          this.userRoles = response;
        })
      ),
      this.customer.getGeneralSettings().pipe(
        map(response => {
          this.generalSettings = response;
        })
      ),
      this.customer.getStates().pipe(
        map(response => {
          this.states = response;
        })
      ),
      this.customer.getLocalBodyTypes().pipe(
        map(response => {
          this.localBodyTypes = response;
        })
      ),
      this.customer.getLocalBodyTypes().pipe(
        map(response => {
          this.localBodyTypes = response;
        })
      ),
      // this.app.getActiveBankAccounts().pipe(
      //   map(response => {
      //     this.activeBankAccounts = response;
      //   })
      // )
      // this.app.isGoogleApiEnabled().pipe(
      //   map(response => {
      //     this.googleApiSettings = response; 
      //   })
      // )
    ]);
  }

  sendDataByEvent(data: any) {
    this.dataByEvent.emit(data);
  }
  // onValueChanged(value: any) {
  //  this.onChange$.next(value);

  //}
}
