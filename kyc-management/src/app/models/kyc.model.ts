export interface KycDTO {
    id?: number;
    kycType: KycType;
    kycStatus: KycStatus;
    documentDetails: string;
    userId: string;
  }
  
  export enum KycType {
    ID_PROOF = 'ID_PROOF',
    ADDRESS_PROOF = 'ADDRESS_PROOF',
    INCOME_PROOF = 'INCOME_PROOF'
  }
  
  export enum KycStatus {
    SUBMITTED = 'SUBMITTED',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    PENDING = 'PENDING'
  }
  