export interface Commission {
  commissionId: number;
  partnerId: number;
  partner?: {
    partnerName: string;
  };
  amount: number;
  calculatedAt: Date;
  paidOut: boolean;
  description?: string;
  status?: string; // For display
}

export interface CommissionSummary {
  total: number;
  pending: number;
  paid: number;
}