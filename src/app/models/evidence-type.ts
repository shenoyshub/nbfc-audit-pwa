export interface EvidenceType {
  evidenceTypeCode: string;
  evidenceTypeName: string;
  evidenceCategoryCode: string;
  allowedFormats: string[];
  sourceTypes: string[];
  mandatoryFields: string[];
  retentionPeriod: string;
}
