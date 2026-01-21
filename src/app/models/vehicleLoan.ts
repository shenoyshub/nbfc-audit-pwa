

export interface VehicleLoan {
    
    uniqueAccountNumber?: string;
    applicationNumber?: number;
    customerName?: string;
    applicationDate?: string;
    disbursementDate?: string;
    numberOfInstallment?: 24;
    loanAmount?: number;
    isClosed?: boolean;
    scheme?: string;
    startDate?: string;
    currentStage?: string;
    createdBy?: string;
    createdOn?: string;   
}

export interface ApplicationDetails {
    
        uniqueAccountNumber?: string,
        applicationNo?: string,
        applicationDate?: string,
        loanType?: string,
        applicants?: [
            {
                customerID?: string,
                customerName?: string,
                sequence?: number,
                natureOfOccupationDesc?: string,
                organisationTypeDesc?: string,
                businessNatureDesc?: string,
                natureOfOccupation?: number,
                employerName?: string,
                employerBusinessAddress?: string,
                totalExperienceYears?: string,
                totalExperienceMonths?: string,
                currentJobPeriodYears?: string,
                currentJobPeriodMonths?: string,
                employeeID?: string,
                department?: string,
                designation?: string,
                organisationType?: string,
                businessNature?: string,
                businessName?: string,
                sharesHolding?: string,
                grossAnnualIncome?: string,
                netAnnualIncome?: string,
                notes?: string
            }
        ],
        guarantees?: [],
        property?: string,
        vehicle?: {
            manufacturer?: string,
            model?: string,
            variant?: string,
            dealer?: string,
            dealerBranch?: string,
            isUsedVehicle?: string,
            registrationNumber?: string,
            vinChassisNumber?: string,
            engineNumber?: string,
            manufacturerID?: number,
            modelID?: number,
            fuelType?: string,
            variantID?: number,
            colour?: string,
            sellerName?: string,
            sellerAddress?: string,
            dealerID?: number,
            dealerBranchID?: number,
            manufacturerYear?: number,
            manufacturerMonth?: number,
            monthYearManufacture?: string,
            kmsRun?: number,
            invoiceNumber?: string,
            invoiceDate?: string,
            notes?: string
        },
        assetCost?: number,
        requestedAmount?: number,
        installments?: number,
        interestRate?: number,
        interestMain?: number,
        interestOther?: number,
        processingFee?: number,
        stages?: [
            {
                stage?: string,
                levelNumber?: number,
                notes?: string,
                doneBy?: string,
                doneOn?: string,
                enteredBy?: string,
                enteredOn?: string
            },
        ],
        completedLevelNumber?: number,
        approvedAmount?: number,
        approvedInstallments?: number,
        approvedInterestRate?: number,
        approvedInterestRateMain?: string,
        approvedInterestRateOther?: string,
        insuranceAmount?: number,
        currentInstallmentNumber?: number,
        attachments?: [],
        appliedFees?: any[],
        isClosed?: boolean,
        closedOn?: string,
        executiveName?: string,
        executiveID?: number,
        repaymentModeDesc?: string
    
}

export interface CustomerDetails {
    customerID?: string,
    customerName?: string,
    customerFirstName?: string,
    customerMiddleName?: string,
    customerLastName?: string,
    gender?: string,
    dob?: string,
    phoneNumber?: string,
    cellNumber?: string,
    email?: string,
    mailingAddress?: {
        address1?: string,
        address2?: string,
        pinCode?: string,
        office_House?: string,
        city?: string,
        landmark?: string,
        districtID?: number,
        district?: string,
        state?: string,
        stateID?: number,
        tehsilID?: string,
        villageID?: string,
        localBodyID?: string,
        postOfficeID?: string,
        localBodyTypeID?: string
    },
    officeAddress?: {
        address1?: string,
        address2?: string,
        pinCode?: string,
        office_House?: string,
        city?: string,
        landmark?: string,
        districtID?: number,
        district?: string,
        state?: string,
        stateID?: number,
        tehsilID?: string,
        villageID?: string,
        localBodyID?: string,
        postOfficeID?: string,
        localBodyTypeID?: string
    },
    permanentAddress: {
        isSameAsMailingAddress?: boolean,
        address1?: string,
        pinCode?: string,
        districtID?: number,
        address2?: string,
        office_House?: string,
        city?: string,
        landmark?: string,
        district?: string,
        state?: string,
        stateID?: number,
        tehsilID?: string,
        villageID?: string,
        localBodyID?: string,
        postOfficeID?: number,
        localBodyTypeID?: string
    },
    brID?: string,
    isConfirmed?: boolean,
    liablity?: number,
    image?: string,
    imageType?: string,
    imageID?: string,
    imageObjectURL?: string,
    signature?: string,
    signatureType?: string,
    signatureID?: string,
    signatureObjectURL?: string,
    isAddressProof?: string,
    isIdentificationProof?: string,
    kycDocuments?: string,
    beneficiaryAccounts?: [],
    isNetBankingEnabled?: boolean,
    isDisbursePermitted?: boolean,
    ckycNumber?: string,
    ckycProfileUrl?: string,
    pan?: string,
    nationalityID?: number,
    professionID?: number,
    incomeRangeID?: string,
    additionalNames?: [],
    isNonIndividual?: boolean,
    nonIndividualInfo?: string,
    flagInfo?: string
}

export interface MenuListResp {
    menu: Menu []
}

export interface Menu {
    module?: string
    defaultURL: string
    children: Menu[]
    title: string
    icon: string
    rights?: any[]
    visible: boolean
    url: string
}

export interface User {
    displayName: string
    jobTitle: string
    currentBranch: number
    imageSrc: any
    passwordExpiryDays: number
    currentBranchDisplayName: string
    permittedBranches: PermittedBranch[]
    permissions: string[]
    executiveID: number
  }
  
  export interface PermittedBranch {
    brID: number
    branchName: string
  }
  





export interface TransactionHistory {
    "id": number,
    "brID": number,
    "transDate": string,
    "installmentNumber"?: number,
    "receivedAmount": number,
    "createdBy": string,
    "createdOn": string,
    "isPassed": boolean
}

export interface RefreshTokenRespsonse {
        "access_token": string;
        "id_token": string;
        "token_type": string,
        "refresh_token": string,
        "expires_in": number
}

export interface installmentDues {
    "installmentNumber": number,
    "totalDue": number,
    "totalInstallmentDue": number,
    "installmentDate": string,
    "hasPendingInstallment": boolean,
    "principalDue": number,
    "interestDue": number,
    "interestMainDue": number,
    "interestOtherDue": number,
    "installmentDue": number,
    "insuranceDue": number,
    "interestForDelayedPeriodDue": number,
    "penalInterestDue": number,
    "otherChargeDue": number
}

export interface Scheme  {
    "createdBy": string,
    "createdOn": string,
    "code": string,
    "description": string
}

export interface Reports {
    "id": number,
    "title": string,
    "children": Reports[],
    "isSubModule": boolean,
    "reportPath": string
}


export interface ReportParam {
    Type: string
    Label: string
    Options: string
    Validation: ValidationRequirement
    DisplayType: string
    Placeholder: string
    ReportParam: string
    DefaultValue: string
  }
  
  export interface ValidationRequirement {
    required?: string
  }
  

export interface ExampleFlatNode {
    expandable: boolean;
    name: string;
    level: number;
    id: number;
  }

  export interface Manufacturer {
    id: number,
    title: string,
  }

  export interface Dealer {
    amountAfterTax(arg0: string, amountAfterTax: any): unknown;
    feeAmount(arg0: string, feeAmount: any): unknown;
    feeName: string;
    id: number,
    title: string,
  }

  export interface Customer{
    "customerName": string,
    "customerID": string,
    "phoneNumber": string,
    "address1": string,
    "address2": string
}

export interface Document {
    "docNo": string;
    "name": string;
    "proof": string;
    "issueDate": string;
    "expiryDate": string;
}

export interface DocumentResponse {
    "code": string,
    "name": string,
    "isExpirable": boolean,
    "isIdProof": boolean,
    "isAddressProof": boolean,
    "regexFormat": string,
    "displayFormat"?: string
  }

  export interface PaymentBreakup {
    installmentNumber: number
    totalDue: number
    totalInstallmentDue: number
    installmentDate: string
    hasPendingInstallment: boolean
    principalDue: number
    interestDue: number
    interestMainDue: number
    interestOtherDue: number
    installmentDue: number
    insuranceDue: number
    interestForDelayedPeriodDue: number
    penalInterestDue: number
    otherChargeDue: number
  }
  

  export interface ReportPrintData {
    title: string
    data: any[]
    headers: Header[]
  }
  
  export interface Header {
    header: string
    dataMember: string
    dataType: string
    hasTotal: boolean
  }
  