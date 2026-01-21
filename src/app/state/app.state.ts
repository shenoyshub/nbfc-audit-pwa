import { CompanyInfo } from "./company";
import { AppUser } from "./user.state";
import { createSelector } from '@ngrx/store';
import { Menu } from "../models/vehicleLoan";

export interface AppState {
    appUser?: AppUser,
    companyDetails?: CompanyInfo,
    menuList?: any[],
}


 
    export const selectAppState = (state: AppState) => state;
 
    export const appStateSelector = createSelector(
        selectAppState,
      (state: AppState) => state
    );
    