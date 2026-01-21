export interface LoanState {
    uniqueAccountNumber: string;
    applicationNo: number;
    applicationDate: Date;
    loanType: string;
    applicants: Applicant[];
    guarantees: any[];
    property?: any;
    vehicle: Vehicle;
    assetCost: number;
    requestedAmount: number;
    installments: number;
    interestRate: number;
    interestMain: number;
    interestOther: number;
    processingFee: number;
    stages: Stage[];
    completedLevelNumber: number;
    approvedAmount: number;
    approvedInstallments: number;
    approvedInterestRate: number;
    approvedInterestRateMain: number;
    approvedInterestRateOther: number;
    insuranceAmount: number;
    currentInstallmentNumber: number;
    attachments: any[];
    appliedFees: any[];
    isClosed: boolean;
    closedOn?: any;
    executiveName: string;
    executiveID: number;
    repaymentModeDesc: string;
    referenceNumber?: any;
    loanReceipts: LoanReciepts[] | [];
}


export interface Applicant {
    customerID: string;
    customerName: string;
    sequence: number;
    natureOfOccupationDesc: string;
    organisationTypeDesc: string;
    businessNatureDesc: string;
    natureOfOccupation: number;
    employerName?: any;
    employerBusinessAddress?: any;
    totalExperienceYears?: any;
    totalExperienceMonths?: any;
    currentJobPeriodYears?: any;
    currentJobPeriodMonths?: any;
    employeeID?: any;
    department?: any;
    designation?: any;
    organisationType?: any;
    businessNature?: any;
    businessName?: any;
    sharesHolding?: any;
    grossAnnualIncome?: any;
    netAnnualIncome?: any;
    notes?: any;
}

export interface Vehicle {
    manufacturer: string;
    model: string;
    variant: string;
    dealer: string;
    dealerBranch: string;
    isUsedVehicle: boolean;
    registrationNumber?: any;
    vinChassisNumber?: any;
    engineNumber?: any;
    manufacturerID: number;
    modelID: number;
    fuelType?: any;
    variantID: number;
    colour?: any;
    sellerName?: any;
    sellerAddress: string;
    dealerID: number;
    dealerBranchID: number;
    manufacturerYear: number;
    manufacturerMonth: number;
    monthYearManufacture?: any;
    kmsRun: number;
    invoiceNumber?: any;
    invoiceDate?: any;
    notes?: any;
}

export interface Stage {
    stage: string;
    levelNumber: number;
    notes: string;
    doneBy: string;
    doneOn: Date;
    enteredBy: string;
    enteredOn: Date;
}

export interface LoanReciepts {
    id: number;
    brID: number;
    transDate: Date;
    installmentNumber?: any;
    receivedAmount: number;
    createdBy: string;
    createdOn: Date;
    isPassed: boolean;
}