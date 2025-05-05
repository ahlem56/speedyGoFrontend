export interface Partner {
  partnerId: number;
  partnerCode?: number;
  partnerName: string;
  partnerContactInfo?: string;
  partnershipDuration?: number;
  commissionRate?: string | number;
  totalCommission?: string | number;
  simpleUsers?: any[];
  promotions?: any;
}