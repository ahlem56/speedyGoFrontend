// partner-commission.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { CommissionService } from '../../../Services/commission.service';
import { Commission } from '../../../Models/commission.model';

@Component({
  selector: 'app-commission',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatChipsModule,
    MatCardModule,
    MatTableModule,
    RouterModule
  ],
  templateUrl: './commission.component.html',
  styleUrls: ['./commission.component.scss'],
  providers: [CommissionService]
})
export class PartnerCommissionComponent implements OnInit {
  commissions: Commission[] = [];
  summary: any = {
    totalCommission: 0,
    pendingCommission: 0,
    paidCommission: 0
  };
  displayedColumns: string[] = ['id', 'amount', 'status', 'description', 'createdAt'];
  isLoading = true;
  error: string | null = null;

  constructor(private commissionService: CommissionService) { }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData(): Promise<void> {
    this.isLoading = true;
    this.error = null;

    try {
      const [summary, commissions] = await Promise.all([
        this.commissionService.getCurrentPartnerCommissionSummary().toPromise(),
        this.commissionService.getPartnerCommissions().toPromise()
      ]);

      if (summary && commissions) {
        this.summary = summary;
        this.commissions = commissions;
      } else {
        throw new Error('Failed to load commission data');
      }
    } catch (error) {
      console.error('Error loading commission data:', error);
      this.error = 'Failed to load commission data. Please try again later.';
    } finally {
      this.isLoading = false;
    }
  }

  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'accent';
      case 'paid':
        return 'primary';
      default:
        return '';
    }
  }

  retry(): void {
    this.loadData();
  }
}