export interface SamplingType {
  samplingTypeCode: string;
  samplingTypeName: string;
  samplingCategoryCode: string;
  description: string;
  requiresSampleSize: boolean;
  requiresPopulationSize: boolean;
  confidenceLevelOptions?: number[];
  thresholdRequired?: boolean;
  riskApplicability: string[];
  allowedAuditContexts: string[];
}