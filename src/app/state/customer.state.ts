
    export interface MailingAddress {
        address1: string;
        address2: string;
        pinCode: string;
        office_House: string;
        city: string;
        landmark: string;
        districtID: number;
        district: string;
        state: string;
        stateID: number;
        tehsilID: number;
        villageID?: any;
        localBodyID?: any;
        postOfficeID: number;
        localBodyTypeID?: any;
        policeStation?: any;
    }

    export interface PermanentAddress {
        isSameAsMailingAddress: boolean;
        address1?: any;
        pinCode?: any;
        districtID: number;
        address2?: any;
        office_House?: any;
        city?: any;
        landmark?: any;
        district?: any;
        state?: any;
        stateID: number;
        tehsilID: number;
        villageID?: any;
        localBodyID?: any;
        postOfficeID: number;
        localBodyTypeID?: any;
        policeStation?: any;
    }

    export interface OfficeAddress {
        address1?: any;
        address2?: any;
        pinCode?: any;
        office_House?: any;
        city?: any;
        landmark?: any;
        districtID?: any;
        district?: any;
        state?: any;
        stateID: number;
        tehsilID?: any;
        villageID?: any;
        localBodyID?: any;
        postOfficeID?: any;
        localBodyTypeID?: any;
        policeStation?: any;
    }

    export interface CustomerDetails {
        customerID: string;
        customerName: string;
        customerFirstName: string;
        customerMiddleName: string;
        customerLastName: string;
        gender: string;
        dob: Date;
        phoneNumber?: any;
        cellNumber: string;
        email?: any;
        mailingAddress: MailingAddress;
        permanentAddress: PermanentAddress;
        officeAddress: OfficeAddress;
        brID: number;
        isConfirmed: boolean;
        liablity: number;
        image: string;
        imageType: string;
        imageID: string;
        imageObjectURL?: any;
        signature?: any;
        signatureType?: any;
        signatureID?: any;
        signatureObjectURL?: any;
        isAddressProof: boolean;
        isIdentificationProof: boolean;
        kycDocuments?: any;
        beneficiaryAccounts: any[];
        isNetBankingEnabled: boolean;
        isDisbursePermitted: boolean;
        ckycNumber?: any;
        ckycProfileUrl?: any;
        pan?: any;
        nationalityID: number;
        professionID?: any;
        incomeRangeID?: any;
        maritalStatus?: any;
        educationalQualification?: any;
        preferredCommunicationLanguage?: any;
        additionalNames: any[];
        isNonIndividual: boolean;
        nonIndividualInfo?: any;
        flagInfo?: any;
    }

