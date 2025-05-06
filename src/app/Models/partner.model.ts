export interface Promotion {
  promotionTitle: string;
  promotionDescription: string;
  promotionDiscountPercentage: number;
  promotionStartDate: string;
  promotionEndDate: string;
}

export interface Partner {
  partnerId: number;
  partnerName: string;
  partnerContactInfo: string;
  partnerCode: number;
  partnershipDuration: number;
  totalCommission: number;
  commissionRate: number;
  promotions?: Promotion;
}