import {Component, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {AppEvent, EventService} from "../../../../Core/event.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {DatePipe} from "@angular/common";
import {ConfirmDeleteComponentComponent} from "../confirm-delete-component/confirm-delete-component.component";

@Component({
    selector: 'app-event-list-backoffice',
    templateUrl: './event-listBackOffice.component.html',
    styleUrls: ['./event-listBackOffice.component.css'],
    standalone: false
})
export class EventListBackOfficeComponent {
  displayedColumns: string[] = ['eventDate', 'eventDescription', 'eventLocation', 'actions'];
  dataSource!: MatTableDataSource<Event>; // Change type from AppEvent to Event
  loading = true;
  errorMessage = '';
  searchText = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private eventService: EventService,
    public dialog: MatDialog,
    private datePipe: DatePipe
  ) {}

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

  deleteEvent(eventId: number): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponentComponent, {
      data: { title: 'Delete Event', message: 'Are you sure you want to delete this event?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eventService.deleteEvent(eventId).subscribe({
          next: () => this.loadEvents(),
          error: (err) => this.errorMessage = 'Error deleting event: ' + err
        });
      }
    });
  }

  formatDate(date: string): string {
    return this.datePipe.transform(date, 'medium') || '';
  }
}
