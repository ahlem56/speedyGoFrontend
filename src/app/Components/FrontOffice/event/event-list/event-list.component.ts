// event-list-front-office.component.ts
import { Component, ViewChild } from '@angular/core';
import { EventService, AppEvent } from "../../../../Core/event.service";
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
  standalone: false,
  host: { class: 'front-office' }
})
export class EventListFrontOfficeComponent {
  displayedColumns: string[] = ['eventDate', 'eventDescription', 'eventLocation'];
  dataSource!: MatTableDataSource<Event, MatPaginator>;
  loading = true;
  errorMessage = '';
  searchText = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private eventService: EventService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getAllEvents().subscribe({
      next: (events) => {
        this.dataSource = new MatTableDataSource(events);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Error loading events: ' + err;
        this.loading = false;
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  formatDate(date: string): string {
    return this.datePipe.transform(date, 'medium') || '';
  }
}
