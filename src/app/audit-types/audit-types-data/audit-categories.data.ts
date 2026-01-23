import { AuditCategory } from './../interfaces/audit-category';

export const AUDIT_CATEGORIES: AuditCategory[] = [

  {
    id: 1,
    name: 'Mandatory Statutory & Regulatory Audits',
    auditTypes: [
      {
        id: 101,
        name: 'Statutory Audit',
        description: 'Audit of financial statements under Companies Act, 2013.',
        icon: 'business_center'
      },
      {
        id: 102,
        name: 'RBI Inspection / Supervisory Audit',
        description: 'Inspection conducted by RBI to assess regulatory compliance.',
        icon: 'account_balance'
      },
      {
        id: 103,
        name: 'Internal Audit',
        description: 'Independent evaluation of internal controls and processes.',
        icon: 'fact_check'
      },
      {
        id: 104,
        name: 'Concurrent Audit',
        description: 'Real-time transaction and process verification.',
        icon: 'sync'
      },
      {
        id: 105,
        name: 'Secretarial Audit',
        description: 'Review of corporate governance and ROC compliances.',
        icon: 'gavel'
      },
      {
        id: 106,
        name: 'Tax Audit',
        description: 'Audit under Income Tax Act, Section 44AB.',
        icon: 'receipt_long'
      }
    ]
  },

  {
    id: 2,
    name: 'Risk & Credit Audits',
    auditTypes: [
      {
        id: 201,
        name: 'Risk-Based Internal Audit',
        description: 'Audit based on key risk areas of the NBFC.',
        icon: 'assessment'
      },
      {
        id: 202,
        name: 'Credit Audit',
        description: 'Review of loan appraisal, sanction, and monitoring.',
        icon: 'credit_score'
      },
      {
        id: 203,
        name: 'Asset Quality Review (AQR)',
        description: 'Assessment of asset classification and provisioning.',
        icon: 'trending_down'
      },
      {
        id: 204,
        name: 'Fraud Risk Audit',
        description: 'Identification of fraud risks and early warning signals.',
        icon: 'warning'
      }
    ]
  },

  {
    id: 3,
    name: 'IT, Cyber & Digital Audits',
    auditTypes: [
      {
        id: 301,
        name: 'Information System (IS) Audit',
        description: 'Audit of core systems, LOS, LMS, and ERP.',
        icon: 'computer'
      },
      {
        id: 302,
        name: 'Cyber Security Audit',
        description: 'Assessment of cyber security controls as per RBI framework.',
        icon: 'security'
      },
      {
        id: 303,
        name: 'BCP / DR Audit',
        description: 'Business Continuity and Disaster Recovery preparedness.',
        icon: 'backup'
      },
      {
        id: 304,
        name: 'Digital Lending Audit',
        description: 'Compliance with RBI Digital Lending Guidelines.',
        icon: 'smartphone'
      }
    ]
  },

  {
    id: 4,
    name: 'Compliance & Legal Audits',
    auditTypes: [
      {
        id: 401,
        name: 'Compliance Audit',
        description: 'Review of adherence to RBI master directions and circulars.',
        icon: 'rule'
      },
      {
        id: 402,
        name: 'AML / CFT Audit',
        description: 'Audit of AML, CFT, and PMLA compliance.',
        icon: 'policy'
      },
      {
        id: 403,
        name: 'KYC Audit',
        description: 'Evaluation of customer due diligence and KYC processes.',
        icon: 'verified_user'
      },
      {
        id: 404,
        name: 'Fair Practices Code (FPC) Audit',
        description: 'Assessment of customer fairness and disclosures.',
        icon: 'handshake'
      },
      {
        id: 405,
        name: 'Outsourcing / Vendor Audit',
        description: 'Audit of service providers, DSAs, and collection agencies.',
        icon: 'groups'
      }
    ]
  },

  {
    id: 5,
    name: 'Operational & Functional Audits',
    auditTypes: [
      {
        id: 501,
        name: 'Branch Audit',
        description: 'Audit of branch operations, cash, and documentation.',
        icon: 'store'
      },
      {
        id: 502,
        name: 'Loan Processing Audit',
        description: 'End-to-end audit of loan lifecycle.',
        icon: 'assignment'
      },
      {
        id: 503,
        name: 'Collection & Recovery Audit',
        description: 'Audit of collection practices and recovery mechanisms.',
        icon: 'payments'
      },
      {
        id: 504,
        name: 'Treasury Audit',
        description: 'Audit of investments, ALM, and liquidity management.',
        icon: 'account_balance_wallet'
      },
      {
        id: 505,
        name: 'HR & Payroll Audit',
        description: 'Review of payroll, HR processes, and statutory dues.',
        icon: 'people'
      },
      {
        id: 506,
        name: 'Procurement / Expense Audit',
        description: 'Audit of procurement controls and expense management.',
        icon: 'shopping_cart'
      }
    ]
  },

  {
    id: 6,
    name: 'Special & Thematic Audits',
    auditTypes: [
      {
        id: 601,
        name: 'Forensic Audit',
        description: 'Detailed investigation of suspected fraud or irregularities.',
        icon: 'search'
      },
      {
        id: 602,
        name: 'Related Party Transaction Audit',
        description: 'Review of arm’s length compliance of RPTs.',
        icon: 'compare_arrows'
      },
      {
        id: 603,
        name: 'Customer Grievance Redressal Audit',
        description: 'Audit of grievance handling and Ombudsman compliance.',
        icon: 'support_agent'
      }
    ]
  }

];
