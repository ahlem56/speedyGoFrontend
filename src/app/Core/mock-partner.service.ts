import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Partner } from '../Models/partner.model';

@Injectable({
  providedIn: 'root'
})
export class MockPartnerService {
  private mockPartners: Partner[] = [
    {
      partnerId: 101,
      partnerName: 'Louati Amin',
      partnerContactInfo: 'amiin@esprit.tn',
      partnershipDuration: 5,
      commissionRate: '0.15',
      totalCommission: '1500.00'
    },
    {
      partnerId: 102,
      partnerName: 'Louati Amin',
      partnerContactInfo: 'test@example.com',
      partnershipDuration: 5,
      commissionRate: '0.10',
      totalCommission: '750.00'
    },
    {
      partnerId: 103,
      partnerName: 'sfsd dfgg',
      partnerContactInfo: 'commission@example.com',
      partnershipDuration: 6,
      commissionRate: '0.20',
      totalCommission: '2500.00'
    },
    {
      partnerId: 106,
      partnerName: 'Partner User',
      partnerContactInfo: 'partner@speedygo.com',
      partnershipDuration: 12,
      commissionRate: '0.15',
      totalCommission: '1000.00'
    },
    {
      partnerId: 108,
      partnerName: 'Partner User',
      partnerContactInfo: 'partner2@speedygo.com',
      partnershipDuration: 12,
      commissionRate: '0.15',
      totalCommission: '1200.00'
    },
    {
      partnerId: 109,
      partnerName: 'partner partner',
      partnerContactInfo: 'partner1@test.com',
      partnershipDuration: 12,
      commissionRate: '0.15',
      totalCommission: '800.00'
    }
  ];

  constructor() { }

  getPartners(): Observable<Partner[]> {
    console.log('Using mock partners data');
    return of(this.mockPartners);
  }

  getPartnerById(id: number): Observable<Partner> {
    const partner = this.mockPartners.find(p => p.partnerId === id);
    return of(partner || this.mockPartners[0]);
  }
} 