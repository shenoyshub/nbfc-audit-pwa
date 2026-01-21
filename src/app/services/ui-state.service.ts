import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiStateService {

  applicationPageSelectedTab = 0;
  ledgerSelectedBranch = '';
  ledgerFilterCentre = '';
  ledgerFilterText = '';
  ledgerFilterApplnNo = '';
  ledgerSelectedState = '';
  ledgerSelectedDistrict = '';
  ledgerSelectedScheme = '';
  selectedModuleCode = '';
  selectedModuleCategory = '';
  selectedModuleTitle = '';
  requirePrecheckForSelectedModule: boolean = false;
  requireUnmaturePosting: boolean = false; 
  showMyTasks: boolean = false;
  loanSettings: any = {};
  constructor() { }

  clearModuleSettings() {
    this.selectedModuleCode = '';
    this.selectedModuleCategory = '';
    this.requirePrecheckForSelectedModule = false;
    this.loanSettings = {};
    localStorage.removeItem("selectedMenuParent");
  }
}
