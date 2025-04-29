export interface Commission {
  id: number;
  partnerId: number;
  amount: number;
  status: 'PENDING' | 'PAID';
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommissionSummary {
  totalAmount: number;
  pendingAmount: number;
  paidAmount: number;
} 