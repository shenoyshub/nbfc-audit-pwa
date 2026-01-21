import { createAction, props } from '@ngrx/store';
import { CompanyInfo } from '../state/company';
import { AppUser } from '../state/user.state';

export enum AppActionEnum {
    SET_MENU_LIST = "SET MENU LIST",
    SET_COMPANY_DETAILS = "SET_COMPANY_DETAILS",
    SET_USER_DETAILS = "SET USER DETAILS",

    GET_COMPANY_DETAILS = "GET_COMPANY_DETAILS",
    GET_MENU_LIST = "GET_MENU_LIST"
}

export const setMenuList = createAction(AppActionEnum.SET_MENU_LIST,
  props<{ menuList: any[] }>()
);

export const setCompanyInfo = createAction(AppActionEnum.SET_COMPANY_DETAILS, 
    props<{companyInfo: CompanyInfo}>()
);

export const setUserInfo = createAction(AppActionEnum.SET_USER_DETAILS, 
  props<{userDetails: AppUser}>()  
);
