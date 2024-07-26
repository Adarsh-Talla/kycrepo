export enum KycStatus {
    SUBMITTED = 'SUBMITTED',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    PENDING = 'PENDING'
  }
  
  export enum KycType {
    ID_PROOF = 'ID_PROOF',
    ADDRESS_PROOF = 'ADDRESS_PROOF',
    INCOME_PROOF = 'INCOME_PROOF'
  }
  
  export interface KycDTO {
    id: number;
    userName: string;
    kycType: KycType;
    kycStatus: KycStatus;
    documentDetails: string;
  }