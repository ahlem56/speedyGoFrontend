export interface Payment {
    paymentId: number;
    paymentAmount: number;
    paymentDate: string | Date;
    paymentMethod?: string;
    stripeChargeId?: string;
    user?: any;      // You can replace with a proper User model later
    trip?: any;      // Replace with actual Trip model if needed
    parcel?: any;    // Replace with actual Parcel model if needed
  }
  